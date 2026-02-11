from fastmcp import FastMCP

# 1. MCP 서버 생성
mcp = FastMCP("Fashion Server")

# 2. 데이터 (기존 main.py에서 가져옴)
ootd_log = {
    "monday": "검정 슬랙스에 흰 셔츠",
    "tuesday": "청바지에 후드티",
    "wednesday": "트레이닝복 세트",
    "thursday": "베이지색 트렌치코트",
    "friday": "화려한 파티룩"
}

# 2. 데이터 (Frontend Member 인터페이스와 일치오시킴)
members_db = [
    {
        "id": 1,
        "username": "ideabong",
        "role": "Designer",
        "gender": "male",
        "style": "시티보이 룩",
        "location": "Seoul"
    },
    {
        "id": 2,
        "username": "sunny",
        "role": "Frontend Dev",
        "gender": "female",
        "style": "러블리 캐주얼",
        "location": "Busan"
    }
]

# 3. 도구 등록 (@mcp.tool)

@mcp.tool
def get_ootd(day: str) -> str:
    """Get the outfit of the day for a specific day of the week."""
    return ootd_log.get(day, "기록된 코디가 없습니다.")

@mcp.tool
def get_all_members() -> list[str]:
    """Get the list of all team member usernames."""
    return [m["username"] for m in members_db]

@mcp.tool
def get_team_members() -> list[dict]:
    """Get the full list of team members with detailed information."""
    return members_db

@mcp.tool
def get_member_detail(username: str) -> dict | str:
    """Get detailed profile information including location and style for a team member.
    Returns error message if member is not found.
    """
    member = next((m for m in members_db if m["username"] == username), None)
    if not member:
        return "팀원을 찾을 수 없습니다."
    return member

if __name__ == "__main__":
    mcp.run()
