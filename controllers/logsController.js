const express = require('express'); //import express
const logs = express.Router(); //create express router
const logsArray = require('../models/log'); //import log model

//ROUTES
// Using If statement and route parameters
logs.get('/', (req, res) => {
    const { order, mistakes, lastCrisis } = req.query; //get query parameters destructured
    let logQuery = [...logsArray]; //create copy of model query object
    if (order === "asc") { //if order query parameter is present
        logQuery.sort = ((a,b)=> {  //add sort property to logQuery object with callback function
            return a.title > b.title ? 1 : -1;
         }); 
    } else if (order === "desc") {
        logQuery.sort = ((a,b)=> { 
            return a.title > b.title ? -1 : 1;
         });
    };
    // Send response
    res.send(logQuery);
});

//Using Switch statement and route parameters
logs.get('/', (req, res) => {
    const reqParameter = req.query; //get query parameters
    let logQuery = [...logsArray]; //create copy of model query object
    for (let par in reqParameter) { //loop through query parameters
        reqParameter[par] = reqParameter[par].toLowerCase(); //convert query parameter values to lowercase
        switch (par) { //switch statement for query parameters
            case "mistakes": //if order query parameter is present
                logQuery = logQuery.filter(log => log.mistakesWereMadeToday === (reqParameter[par] === "true")); //add filter property to logQuery object with callback function
                break;
            case "lastCrisis": //if order query parameter is present
            // Nested if statement
            if (lastCrisis === "gt10") {
                logsArrayCopy = logsArrayCopy.filter((log) => {
                  return log.daysSinceLastCrisis > 10;
                });
              } else if (lastCrisis === "gt20") {
                logsArrayCopy = logsArrayCopy.filter((log) => {
                  return log.daysSinceLastCrisis > 20;
                });
              } else if (lastCrisis === "lte5") {
                logsArrayCopy = logsArrayCopy.filter((log) => {
                  return log.daysSinceLastCrisis <= 5;
                });
              }
                break;
                        
            }}
            // Send response
            res.send(logQuery);
        });

    // SHOW
logs.get("/:id", (req, res) => {
    const { id } = req.params; //get id from params
    if (logsArray[id]) {
      res.send(logsArray[id]); //send log at id
    } else {
      res.redirect("/*"); //redirect to error page
    }
  });

  // POST / CREATE
  //captainName is of type string
//title is of type string
//post is of type string
//mistakesWereMadeToday is of type boolean
//daysSinceLastCrisis is a number
  function logVerification(body)
{
  return typeof body.captainName === "string"&&
  typeof body.title === "string"&&
  typeof body.post === "string"&&
  typeof body.mistakesWereMadeToday === "boolean"&&
//   isFinite(body.daysSinceLastCrisis)
  !Number.isNaN(Number(body.daysSinceLastCrisis))  
}
  logs.post("/", ( req, res )=>{
  //checking if the request body (req.body) passes  verification function. If it passes, add the request body to an array (logsArray) and send the entire array back as a response. If  not, redirect  user to  error page.
    if(logVerification(req.body)){
      logsArray.push(req.body); //add new log to logsArray array
      res.send(logsArray); //send logsArray array
    }
    else
    {
        res.redirect("/*"); //redirect to error page)  
    }
    
  })

  logs.delete("/:id", ( req, res )=>{
    const {id} = req.params; //get id from params
    if(logsArray[id]) //if id exists
    {
      const deleteDelete = logsArray.splice(id,1); //delete log at id
      res.send(`index ${id} deleted`); //send confirmation message
    }
    else
    {
      res.send("id not found"); //send error message
  
    }
  })

module.exports = logs; //export logs router