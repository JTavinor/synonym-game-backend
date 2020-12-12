const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ userName: req.body.userName });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    userName: req.body.userName,
    password: req.body.password,
    wrongWords: [],
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user.userName);
});

router.put("/", async (req, res) => {
  let user = await User.findById(req.body.userId);
  const index = user.wrongWords.findIndex(
    (x) => x.word === req.body.wrongWord.word
  );
  if (index === -1) {
    user.wrongWords.push(req.body.wrongWord);
  }

  await user.save();
  res.status(200).send(user);
});

router.put("/deleteWord", async (req, res) => {
  let user = await User.findById(req.body.userId);
  const index = user.wrongWords.findIndex(
    (x) => x.word === req.body.wrongWord.word
  );
  user.wrongWords.splice(index, 1);

  await user.save();
  res.status(200).send(user);
});

router.get("/wrongWords/:id", async (req, res) => {
  const wrongWords = await User.findById(req.params.id).select("wrongWords");
  res.send(wrongWords);
});

module.exports = router;
