const axios = require("axios");

// From user statistics API, get data
exports.findScoreByNickname = async (nickname) => {
  try {
    const response = await axios.get("http://localhost:3000/api/user/statistics");
    const allUsers = response.data.data;

    // Return user
    const user = allUsers.find((u) => u.username === nickname);
    return user || null;
  } catch (error) {
    console.error("[findScoreByNickname] Error fetching user statistics:", error);
    throw error;
  }
};