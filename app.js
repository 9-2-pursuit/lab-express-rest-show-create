//DEPENDENCIES
const express = require("express");
const logsController = require("./controllers/logsController.js")

const app = express()

//MIDDLEWARE
app.use(express.json()); //parse incoming JSON



//ROUTES
app.use("/logs", logsController)


module.exports = app;