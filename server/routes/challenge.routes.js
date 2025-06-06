const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenge.controller');

const verifyToken = require('../middlewares/authMiddleware');

router.post('/submit-answer', verifyToken, challengeController.submitAnswer); 

module.exports = router;