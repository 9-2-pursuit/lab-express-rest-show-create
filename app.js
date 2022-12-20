const express = require('express')
const app = express()
const captainLogs = require("./models/log.js")
app.use(express.json())
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send("welcome to the captain's log")
})

app.get('/logs', (req, res) => {
    res.json(captainLogs);  
})

app.get('/logs/:indexlog', (req, res) => {
    if (captainLogs[req.params.indexlog]) {
        res.json(captainLogs[req.params.indexlog]);
      } else {
        res.status(404).json( res.redirect('/logs'));
       
      }
    }); 

    app.delete('/logs/:indexlog', (req, res) => {
        let index = captainLogs.findIndex(item => item.indexlog === req.query.indexlog);
        captainLogs.splice(index, 1);
        res.sendStatus(200);
       });


//   app.get('/logs/:id', (req, res) => {
//     res.send(captainLogs)
//   })

app.post("/logs", (req, res) => {
    captainLogs.push(req.body);
    res.json(captainLogs[captainLogs.length - 1]);
  });

  



  app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
  });

  module.exports = app;
