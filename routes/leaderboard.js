const express = require("express");
const router = express.Router();
const moment = require("moment");
const { User } = require("../models/user");
const { Leaderboard } = require("../models/leaderboard");

router.get("/", async (req, res) => {
  const result = await Leaderboard.find().sort({ score: -1 });
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await Leaderboard.find({ "user._id": req.params.id }).sort({
    score: -1,
  });
  res.send(result);
});

router.post("/", async (req, res) => {
  const user = (await User.findById(req.body.userId)) || {
    _id: null,
    userName: null,
    password: null,
  };

  const leaderboard = new Leaderboard({
    user: {
      _id: user._id,
      userName: user.userName,
      password: user.password,
    },
    name: req.body.name || user.userName,
    score: req.body.score,
    date: moment().locale("en-gb").format("L"),
  });

  const result = await leaderboard.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const movie = await Leaderboard.findByIdAndRemove(req.params.id);
});

module.exports = router;
