const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/ask', async function(req, res, next) {
  try {
    const { message, model } = req.body;
    console.log('Received message:', message, 'Model:', model);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 스트리밍 응답 헤더 설정
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Gemini 모델 가져오기 - 여러 모델명 시도
    const modelName = model || 'gemini-pro';
    console.log('Using model:', modelName);

    const selectModel = genAI.getGenerativeModel({
      model: modelName
    });

    // 스트리밍 텍스트 생성
    const result = await selectModel.generateContentStream(message);

    // 스트림으로 응답 전송
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }

    res.end();
  } catch (error) {
    console.error('Gemini API Error:', error);
    console.error('Error details:', error.message);
    if (!res.headersSent) {
      if (error.status === 429) {
        res.status(429).json({
          error: 'Quota exceeded',
          details: 'You have sent too many requests. Please check your Gemini API quota and try again later. For more information, visit https://ai.google.dev/gemini-api/docs/rate-limits.'
        });
      } else {
        res.status(500).json({ error: 'Failed to generate response', details: error.message });
      }
    } else {
      res.end();
    }
  }
});

module.exports = router;

