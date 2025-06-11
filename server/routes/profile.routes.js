const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profile.controller');

router.get('/', verifyToken, profileController.loadProfile);
router.put('/password', verifyToken, profileController.updatePassword);

module.exports = router;
