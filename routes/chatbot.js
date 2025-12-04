const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async function(req, res, next) {
  try {
    const { message, model } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Gemini 모델 가져오기
    const selectModel = genAI.getGenerativeModel({ model });

    // 텍스트 생성
    const result = await selectModel.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
