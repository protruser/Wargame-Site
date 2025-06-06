// routes/challenge.routes.js
const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenge.controller');

router.post('/submit-answer', challengeController.submitAnswer);

module.exports = router;
