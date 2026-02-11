import os
import asyncio
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

async def list_models():
    client = genai.Client(api_key=api_key)
    try:
        # Pager object is not directly iterable in python async usually, 
        # but let's try the synchronous way or see docs.
        # fastmcp uses google-genai which is the new SDK.
        # It seems client.models.list() is the way.
        
        print("Fetching models...")
        # Note: The new SDK structure might be different. 
        # Let's try to just generate content with a few known names to see what works.
        
        candidates = [
            # Known aliases
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-pro",
            "models/gemini-1.5-flash",
            "imagen-3.0-generate-001",
        ]
        
        for m in candidates:
            print(f"Testing {m}...")
            try:
                # For Text
                if "imagen" not in m:
                    response = await client.aio.models.generate_content(
                        model=m,
                        contents="Hello"
                    )
                    print(f"  [SUCCESS] {m}")
                    return # Stop if found one working text model
                else:
                    # For Image
                    print(f"  [TESTING IMAGE] {m}")
                    response = await client.aio.models.generate_images(
                        model=m,
                        prompt="A cat",
                        config=types.GenerateImageConfig(number_of_images=1)
                    )
                    print(f"  [SUCCESS IMAGE] {m}")
            except Exception as e:
                print(f"  [FAILED] {m}: {e}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(list_models())
