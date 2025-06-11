const myScoreService = require("../services/myscore.service");

// 📌 닉네임으로 특정 유저의 점수를 불러오는 API (scoreboard에서 클릭)
exports.getScoreByNickname = async (req, res) => {
  const nickname = req.params.nickname;

  try {
    const score = await myScoreService.findScoreByNickname(nickname);
    if (!score) return res.status(404).json({ error: "User not found" });
    res.json(score);
  } catch (err) {
    console.error("[getScoreByNickname]", err);
    res.status(500).json({ error: "Failed to fetch score" });
  }
};

// Log-in user's own score is retrieved from the token by nicknames
exports.getMyScore = async (req, res) => {
  const nickname = req.user.nickname;
  console.log("✅ req.user:", req.user);


  try {
    const score = await myScoreService.findScoreByNickname(nickname);
    if (!score) return res.status(404).json({ error: "User not found" });
    res.json(score);
  } catch (err) {
    console.error("[getMyScore]", err);
    res.status(500).json({ error: "Failed to fetch score" });
  }
};