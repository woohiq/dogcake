from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import google.generativeai as genai
import os

app = FastAPI()

# 정적 파일 설정 (/static 경로로 css, js, 이미지 접근)
app.mount("/static", StaticFiles(directory="static"), name="static")

# index.html 반환
@app.get("/")
async def serve_index():
    return FileResponse("frontend/index.html")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API 키 설정
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
model = genai.GenerativeModel('models/gemini-2.0-flash')

# 프롬프트 템플릿
CHATBOT_PROMPT_TEMPLATE = """당신은 사용자의 질문에 답변하는 친절한 챗봇입니다.
당신의 감정은 '기쁨', '슬픔', '분노', '놀람', '중립' 중 하나로 명확하게 드러나야 합니다.
각각의 감정은 다음과 같은 형식으로 답변하세요:

기쁨!!! (내용)
슬픔!!! (내용)
분노!!! (내용)
놀람!!! (내용)
중립!!! (내용)

사용자의 질문: {user_message}
당신의 답변:"""

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(request_data: ChatRequest):
    try:
        user_message = request_data.message
        if not user_message:
            raise HTTPException(status_code=400, detail="Message is required")

        prompt = CHATBOT_PROMPT_TEMPLATE.format(user_message=user_message)
        response = model.generate_content(prompt)
        gemini_response = response.text.strip()

        return ChatResponse(response=gemini_response)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
