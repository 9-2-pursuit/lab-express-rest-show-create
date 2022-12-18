const express = require("express");
const logs = express.Router();
const logsArray = require("../models/log.js");
const { validateURL } = require("../models/validations.js");


logs.get("/", (req, res) => {
    res.json(logsArray)
})

logs.get("/:arrayIndex", (req, res) => {
    if (logsArray[req.params.arrayIndex]) {
      res.json(logsArray[req.params.arrayIndex]);
    } else {
        res.redirect("/")
        res.status(404).json({ error: "Not Found" });
     
    }
});

logs.post("/", validateURL, (req, res) => {
    logsArray.push(req.body);
    res.json(logsArray[logsArray.length - 1]);
  });

module.exports = logs