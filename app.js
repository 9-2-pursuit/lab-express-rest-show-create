

// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const logs = require("./models/log")

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
            
// DEFAULT INFO


// ROUTES
app.get("/", (req, res) => {
  res.send("welcome to the captains log");
});

// LOGS

app.get("/logs", (req, res) => {
    res.json(logs)
} )

// CREATE

app.post('/logs', function (req, res) {
    const log = req.body;
    logs.push(log);
    res.json(logs)
  });

 // SHOW
 
 app.get('/logs/:id', function (req, res) {
    const id = req.params.id;
    if (id < 0 || id >= logs.length) {
      res.redirect("*");
    } else {
      res.send(logs[id]);
    }
  });

// DELETE

app.delete("/logs/:id", (req, res) => {
    const { id } = req.params;
    logs.splice(id, 1);
    res.status(200).send("");
  });

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
