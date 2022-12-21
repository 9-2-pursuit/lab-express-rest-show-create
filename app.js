const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const logsController = require("./controllers/logsController");
const v2LogsController = require("./v2/controllers/logsController");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use("/logs", logsController);
app.use("/v2/logs", v2LogsController);

app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.get("/v2/logs/:index");

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

module.exports = app;
