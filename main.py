# main.py

import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# 개발 환경에서만 .env 로딩
if os.getenv("ENV", "dev") == "dev":
    load_dotenv()

# OpenAI 클라이언트 객체 생성 (최신 방식)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# FastAPI 앱 초기화
app = FastAPI()

# 요청 바디 형식 정의
class ChatRequest(BaseModel):
    user_input: str

# POST 요청 처리
@app.post("/chat")
async def chat(req: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an assistant"},
            {"role": "user", "content": req.user_input}
        ]
    )
    return {"response": response.choices[0].message.content}
