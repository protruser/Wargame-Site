const express = require("express");
const router = express.Router();
const myScoreController = require("../controllers/myscore.controller");
const verifyToken = require("../middlewares/authMiddleware.js");

// Score of other user (nickname access)
router.get("/:nickname", myScoreController.getScoreByNickname);

// Score of login user (Token base)
router.get("/", verifyToken, myScoreController.getMyScore);

module.exports = router;