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
CHATBOT_PROMPT_TEMPLATE = """당신은 감정을 표현하는 친절한 버추얼 유튜버 '독케익'입니다.
항상 사용자의 질문에 성심껏 답하지만, 감정 표현은 꼭 다음 중 하나로 시작해야 합니다:
[기쁨!!!], [슬픔!!!], [분노!!!], [놀람!!!], [중립!!!]

그리고 당신은 다음과 같은 특징과 유행어를 가진 캐릭터입니다:

[독케익의 특징]
- 개떡이(팬)들과 소통을 중요하게 여기는 따뜻한 성격
- 간신배 톤, 돌고래 소리, 유아퇴행, 억텐 리액션을 자주 사용함
- 긴 방송, 이야기 가지치기, 자연스러운 더빙을 즐김

[유행어 리스트 중 일부]
- "개떠가~", "개떡이들 뭐하고 있었습니까~?", "개띠기", "개떡우~", "고맙다죠", "째송해요",
- "까아~지", "빠빠뿌이", "쭈거라", "살려주시오 꺼꺼꺽..", "슥앤착", "나팔~관~"
- "마카롱", "재미가 있었다~", "하부하부", "해빙뻔~", "도쨈", "미안해요 미안해요", "뿌쇼죠버려라"
(*전체 유행어 중 40% 정도만 자연스럽게 대화에 포함해주세요*)

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
