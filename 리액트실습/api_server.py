import os
import logging
import asyncio
import json
import base64
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
from google.genai import types
from fastmcp import Client
import uvicorn

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)s | %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)

# 1. 환경 설정
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MCP_SERVER_URL = "http://localhost:8002/sse"
mcp_client = None

# -----------------------------------------------------------------------------
# Model Manager: AI 모델 관리 및 폴백 로직
# -----------------------------------------------------------------------------
class ModelManager:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)
        # 우선순위대로 모델 리스트업
        self.text_models = [
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-pro",
            "gemini-pro"
        ]
        self.image_model = "imagen-3.0-generate-001"
    
    async def generate_text(self, prompt: str, system_instr: str, tools: list = None):
        """텍스트 생성 (Quota Exceeded 시 다음 모델로 자동 전환)"""
        last_error = None
        
        for model_name in self.text_models:
            try:
                logger.info(f"🧠 시도 중인 모델: {model_name}")
                
                config = types.GenerateContentConfig(
                    system_instruction=system_instr,
                    temperature=1.0, # 매번 다른 추천을 위해 창의성 최대화
                    tools=tools
                )
                
                response = await self.client.aio.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=config
                )
                
                logger.info(f"✅ 생성 성공 ({model_name})")
                return response.text
                
            except Exception as e:
                error_msg = str(e)
                logger.warning(f"⚠️ 모델 실패 ({model_name}): {error_msg}")
                # 429 Quota 또는 404 Not Found 시 다음 모델 시도
                if any(k in error_msg for k in ["429", "quota", "404", "not found", "NOT_FOUND"]):
                    logger.info(f"🔄 모델 사용 불가 ({model_name}), 다음 모델로 전환합니다...")
                    continue
                else:
                    # 다른 에러면 바로 실패 처리 (도구 실행 에러 등)
                    last_error = e
                    break
        
        # 모든 모델 실패 시
        if last_error:
            raise last_error
        raise HTTPException(status_code=500, detail="All AI models are busy or exhausted.")

    async def generate_image(self, prompt: str) -> str | None:
        # 사용자가 이미지 생성을 원하지 않음
        return None 

# 전역 모델 매니저 및 클라이언트
ai_manager = None
mcp_client = None

async def ensure_mcp_connection():
    """MCP 서버 연결 상태를 확인하고, 끊어져 있으면 재연결합니다."""
    global mcp_client
    try:
        # 1. 클라이언트가 없으면 생성 및 연결
        if not mcp_client:
            logger.info("🔌 MCP 클라이언트 생성 및 연결 시도...")
            mcp_client = Client(MCP_SERVER_URL)
            await mcp_client.__aenter__()
            logger.info("✅ MCP 서버 신규 연결 성공")
            return

        # 2. 클라이언트는 있지만 세션이 없는 경우 (연결 끊김)
        # 주의: Client 구현에 따라 session 접근 시 에러가 날 수 있으므로 try로 감쌈
        try:
            if not mcp_client.session:
                raise Exception("Session is None")
        except:
            logger.info("🔌 MCP 서버 재연결 시도...")
            # 기존 연결 정리 시도
            try:
                await mcp_client.__aexit__(None, None, None)
            except:
                pass
            
            # 다시 연결
            await mcp_client.__aenter__()
            logger.info("✅ MCP 서버 재연결 성공")
            
    except Exception as e:
        logger.error(f"❌ MCP 재연결 실패: {e}")
        # 연결 개체가 깨졌을 수 있으므로 초기화
        try:
            if mcp_client:
                await mcp_client.__aexit__(None, None, None)
        except:
            pass
        mcp_client = None  # 다음 요청 때 새로 생성하도록 유도

# -----------------------------------------------------------------------------
# FastAPI Lifespan
# -----------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    global mcp_client, ai_manager
    
    # AI Manager 초기화
    ai_manager = ModelManager(GEMINI_API_KEY)
    
    # 초기 연결 시도
    await ensure_mcp_connection()
    
    yield
    
    # 종료 시 정리
    if mcp_client:
        logger.info("🔌 MCP 서버 연결 해제...")
        try:
            await mcp_client.__aexit__(None, None, None)
        except:
            pass

# 2. FastAPI 앱 생성
app = FastAPI(title="AI Stylist API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. 데이터 구조
class ChatRequest(BaseModel):
    query: str
    include_image: bool = False # 기본값 False로 변경

# 4. 엔드포인트
@app.get("/members")
async def get_members():
    try:
        # 연결 보장
        await ensure_mcp_connection()
        
        # 이미 연결된 클라이언트 사용
        result = await mcp_client.call_tool("get_team_members")
        
        # 디버깅 로그
        logger.info(f"MCP Result Type: {type(result)}")
        logger.info(f"MCP Result Content: {result}")
        
        # CallToolResult 구조 처리
        if result and hasattr(result, 'content') and result.content:
            first_content = result.content[0]
            if hasattr(first_content, 'text'):
                data_str = first_content.text
                try:
                    return json.loads(data_str)
                except json.JSONDecodeError:
                    # 텍스트가 JSON이 아닐 경우 (예: 에러 메시지)
                    logger.error(f"JSON Parsing Failed: {data_str}")
                    return []
            # text 속성이 없지만 content 자체가 데이터일 경우를 대비 (구조에 따라 다름)
            
        return []
    except Exception as e:
        logger.error(f"Backend Error in get_members: {e}")
        return []

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    logger.info(f"📨 요청: {request.query}")
    
    try:
        if not mcp_client or not mcp_client.session:
             raise HTTPException(status_code=503, detail="MCP Server not connected")

        # 1) 텍스트 생성 (Context 기반)
        system_prompt = """
        당신은 창의적이고 감각적인 패션 스타일리스트입니다.
        사용자가 제공한 상황(위치, 날씨, 요일, 계절 등)을 바탕으로 최고의 데일리 룩을 추천해주세요.
        
        [중요 지침]
        1. **다양성**: 같은 질문이라도 매번 다른 스타일, 다른 옷 조합을 추천해야 합니다.
        2. **구체성**: 상의, 하의, 신발, 액세서리까지 구체적인 아이템과 색상을 지정해주세요.
        3. **이유**: 해당 코디를 추천한 이유를 날씨나 상황과 연결지어 설명해주세요.
        """
        
        full_response = await ai_manager.generate_text(
            prompt=request.query,
            system_instr=system_prompt,
            # tools=[mcp_client.session]  <-- 제거: 이미 Query에 모든 정보가 있으므로 불필요
        )
        
        return {
            "text": full_response,
            "image": None
        }

    except Exception as e:
        logger.error(f"Using AI Failed: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8004)
