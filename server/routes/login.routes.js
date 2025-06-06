const express = require('express');
const router = express.Router();

const { login } = require('../controllers/login.controller'); // 로그인 컨트롤러 연결

// 로그인 요청
router.post('/login', login);

module.exports = router;
