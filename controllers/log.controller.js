const express = require("express");

const wood = express.Router();

const logsArray = require("../models/log.js");

const { validateURL } = require("../models/validations.js");

//send data
wood.get("/", (req, res) => {
  res.json(logsArray);
});

//Show
wood.get("/:indexOfArray", validateURL, (req, res) => {
  const { indexOfArray } = req.params;
  console.log(logsArray);
  if (logsArray[indexOfArray]) {
    res.send(logsArray[Number(indexOfArray)]);
  } else {
    res.redirect("/");
  }
});
//Create
wood.post("/", validateURL, (req, res) => {
  logsArray.push(req.body);
  res.json(logsArray[logsArray.length - 1]);
});

//Delete
// DELETE
wood.delete("/:indexOfArray", (req, res) => {
  const deletedLog = logsArray.splice(req.params.indexOfArray, 1);
  res.status(200).json(deletedLog);
});




module.exports = wood;
