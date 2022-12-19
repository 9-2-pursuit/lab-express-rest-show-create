const express = require("express");

const wood = express.Router();

const logArray = require("../models/log.js");

const { validateURL } = require("../models/validations.js");

//send data
wood.get("/", (req, res) => {
  res.json(logArray);
});

wood.get("/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  const element = logArray[Number(arrayIndex) - 1];
  if (element) {
    res.json(element);
  } else {
    res.status(404).json({ error: "Log at given index not Found" });
  }
});

//Create
wood.post("/", validateURL, (req, res) => {
  logArray.push(req.body);
  res.json(logArray[logArray.length - 1]);
});

module.exports = wood;
