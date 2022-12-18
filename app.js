const express = require("express");
const app = express();

const logsController = require("./controllers/logsController");

app.use(express.json());
app.use("/logs", logsController);

app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

module.exports = app;
