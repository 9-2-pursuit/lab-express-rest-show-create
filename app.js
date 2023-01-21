
const express = require("express");

const app = express();

const logs = require("./models/log");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("welcome to the captain's log");
})

app.get("/logs", (req, res) => {
    res.send(logs);
})

app.get("/logs/:logIndex", (req, res) => {
    const { logIndex } = req.params
    const logMatch = logs[logIndex];
    if(!logMatch){
        res.status(404).redirect("/invalid-index")
    }
    else{
        res.send(logMatch);
    }
})

app.post("/logs", (req, res) => {
     logs.push(req.body);
     res.redirect("/logs");
})

app.delete("/logs/:logIndex", (req, res) => {
    const log = logs[req.params.logIndex];

    if(log){
        logs.splice(req.params.logIndex, 1);
        res.redirect("/logs");
    }
    else {
        res.redirect("/invalid-index");
    }
})

app.get("*", (req, res) => {
    res.status(404).send("<h1>Page not found on the server</h1>")
})



module.exports = app;