# 🤖 Chatbot API

Google Gemini AI를 활용한 챗봇 백엔드 API 서버입니다.

## 📋 개요

이 프로젝트는 Express.js 기반의 REST API 서버로, Google Gemini AI와 연동하여 실시간 스트리밍 응답을 제공합니다.

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| Runtime | Node.js |
| Framework | Express.js |
| AI | Google Gemini AI (@google/generative-ai) |
| Package Manager | pnpm |

## 📁 프로젝트 구조

```
chatbot-api/
├── app.js              # Express 앱 설정
├── bin/
│   └── www             # 서버 실행 파일
├── routes/
│   ├── index.js        # 기본 라우터
│   └── chatbot.js      # 챗봇 API 라우터
├── public/             # 정적 파일
├── package.json
└── .env                # 환경 변수 (생성 필요)
```

## ⚙️ 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/KimSeoYeon23/chatbot-api.git
cd chatbot-api
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> 💡 Gemini API 키는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 발급받을 수 있습니다.

### 4. 서버 실행

```bash
# 개발 모드 (nodemon)
pnpm run dev

# 프로덕션 모드
pnpm start
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 📡 API 명세

### 챗봇 메시지 전송

AI에게 메시지를 전송하고 스트리밍 응답을 받습니다.

```
POST /chatbot/ask
```

#### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| message | string | ✅ | 사용자 메시지 |
| model | string | ❌ | AI 모델명 (기본값: gemini-pro) |

#### 지원 모델

- `gemini-3-pro-preview` - 최신 프리뷰 모델
- `gemini-2.5-pro` - 기본 모델
- `gemini-2.5-flash` - 빠른 응답 모델

#### Request 예시

```bash
curl -X POST http://localhost:3000/chatbot/ask \
  -H "Content-Type: application/json" \
  -d '{
    "message": "안녕하세요, JavaScript에 대해 설명해주세요.",
    "model": "gemini-2.5-pro"
  }'
```

#### Response

- **Content-Type**: `text/plain; charset=utf-8`
- **Transfer-Encoding**: `chunked` (스트리밍)

응답은 실시간 스트리밍으로 전송됩니다.

#### Error Response

```json
// 400 Bad Request
{
  "error": "Message is required"
}

// 429 Too Many Requests
{
  "error": "Quota exceeded",
  "details": "You have sent too many requests..."
}

// 500 Internal Server Error
{
  "error": "Failed to generate response",
  "details": "에러 상세 메시지"
}
```

## 🔧 주요 기능

- ✅ **실시간 스트리밍 응답** - `generateContentStream()` 활용
- ✅ **다중 모델 지원** - Gemini 모델 선택 가능
- ✅ **CORS 지원** - 프론트엔드 연동
- ✅ **에러 핸들링** - API 할당량 초과 등 예외 처리

## 🔗 관련 프로젝트

- [chatbot](https://github.com/KimSeoYeon23/chatbot) - React.js 프론트엔드

## 📄 라이선스

MIT License

## 👤 Author

**KimSeoYeon23**

- GitHub: [@KimSeoYeon23](https://github.com/KimSeoYeon23)
