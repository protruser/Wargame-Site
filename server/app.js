// app.js
const express = require('express');
require('./config/db'); // DB 연결 및 테이블 생성 실행
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const challengeRoutes = require('./routes/challenge.routes');

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어
app.use(express.json()); // JSON 요청 파싱

// 워게임 문제 서비스 실행 (예: 포트별 문제용 미니 서버)
require('./challenge1/index');
require('./challenge2/index');
require('./challenge3/index');

// 라우터 등록
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/challenge', challengeRoutes);

// 기본 라우팅
app.get('/', (req, res) => {
    res.send('✅ Server is running and DB connected!');
});

// 에러 핸들링 (선택)
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// 서버 실행
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
