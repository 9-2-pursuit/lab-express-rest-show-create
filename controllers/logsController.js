const express = require("express");
const logArray = require("../models/log.js")


//INSTINTIATE ROUTING 
const logs = express.Router();


logs.get("/", (req, res) => {
    res.json(logArray)
})









module.exports = logs;
