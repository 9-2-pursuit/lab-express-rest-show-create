//DEPENDENCIES
const express = require('express'); //import express
//CONFIGURATION
const app = express(); //create express app

const logsController = require("./controllers/logsController"); //import logsController


//middleware

app.use(express.json()); //parse incoming requests with JSON


//ROUTES
app.use("/logs", logsController); //use logsController for all routes starting with /logs

app.get('/', (req, res) => {
    res.send("welcome to the captain's log"); //send welcome message to root route
});


app.get('*', (req, res) => {
    res.status(404).send("Page not found");  //send 404 message to any other route
});

module.exports = app; //export app