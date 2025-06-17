const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profile.controller');

router.get('/', verifyToken, profileController.loadProfile);
router.put('/password', verifyToken, profileController.updatePassword);
router.delete('/:user_id', verifyToken, profileController.deleteAccount);

module.exports = router;
