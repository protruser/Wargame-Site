const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth.controller');

// Register: POST /api/auth/register
router.post('/register', register);

module.exports = router;
