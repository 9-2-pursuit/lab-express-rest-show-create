const express = require("express");
const app = express();
var path = require('path');
app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(404).send('ko');
      console.log('invalid JSON')
      // throw Error('invalid JSON');
    }
  }
}));

app.get("/",( q, s )=>{
  var options = {
    root: `${path.join(__dirname)}/public/`
  };
  console.log(options)
  s.sendFile( "index.html", options);
  // s.send("welcome to the captain's log");
})


const logs_controller = require("./controllers/logs.controller");
app.use("/logs", logs_controller);


app.get("*",( q, s )=>{
  s.status(404).send("page not found");
})


module.exports = app;