const mongoose = require("mongoose");
const { userSchema } = require("./user");

const leaderboardSchema = new mongoose.Schema({
  user: { type: userSchema, required: false },
  name: String,
  score: Number,
  date: String,
});

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

exports.Leaderboard = Leaderboard;
