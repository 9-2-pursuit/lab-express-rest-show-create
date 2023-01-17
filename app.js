const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const logs = require("./controllers/logs");

// - create a route `/` that says something like `welcome to the captain's log`
// - create a route `/logs` that shows the array of logs you've created
// - create a 404 route that when a user tries to access a route that doesn't exist, they will see this page

app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.get("/404", (req, res) => {
  res.send("404: not found.");
});

app.use("/logs", logs);

app.use("/logs/:arrayIndex", logs);

module.exports = app;
