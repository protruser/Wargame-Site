const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/add', userController.addUser);
router.get('/statistics', userController.getStatistics);
router.delete('/:user_id', verifyToken, userController.deleteAccount);

module.exports = router;
