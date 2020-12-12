const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const leaderboard = require("./routes/leaderboard");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use("/leaderboard", leaderboard);
app.use("/users", users);
app.use("/auth", auth);

mongoose
  .connect(config.get("databaseAddress"))
  .then(console.log("Connected to mongodb..."));

app.listen(process.env.PORT || 5000);

console.log("Listening on port 5000...");
