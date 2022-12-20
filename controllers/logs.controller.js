const express = require("express");
const logs = express.Router();
var logs_data = require("../models/log");


logs.get("/",( q, s )=>{
  const parameter = q.query;
  let data = logs_data;
  for(let x in parameter)
  {
    parameter[x]=parameter[x].toLowerCase();
    switch(x.toLowerCase())
    {
      case "order":
        if(parameter[x]==="asc")
        data = data.sort((a,b)=>a.captainName>b.captainName?1:-1);
        else
        data = data.sort((a,b)=>a.captainName>b.captainName?-1:1);
      break;
      case "mistakes":
        data = data.filter(el=>el.mistakesWereMadeToday.toString().toLowerCase()===parameter[x]);
      break;
      case "lastcrisis":
        try {
          let op = parameter[x].match(/[a-zA-Z]+/g)[0];
          let digi = parameter[x].match(/\d+$/g)[0];
          let formula = null;
          if(op&&typeof Number(digi)=="number")
          {
            switch(op)
            {
              case "gt":
                data = data.filter(el=>el.daysSinceLastCrisis > Number(digi));
              break;
              case "gte":
                data = data.filter(el=>el.daysSinceLastCrisis = Number(digi));
              break;
              case "lte":
                data = data.filter(el=>el.daysSinceLastCrisis < Number(digi));
              break;
            }
          }
          else
          {

          }
        } catch (error) {
          console.log(error);
        }
      break;
    }
  }

  console.log(parameter);
  s.send(data);
});

logs.get("/:id", ( q, s )=>{
  const {id} = q.params;
  if(logs_data[id])
  {
    s.send(logs_data[id]);
  }
  else
  {
    s.status(304).send("id not found");
  }
})

logs.post("/", ( q, s )=>{
  
  if(verify_data(q.body)){
    logs_data.push(q.body);
    s.status(303).json(logs_data);
  }
  else
  {
    s.status(500).send("data type error");  
  }
  
})

logs.delete("/:id", ( q, s )=>{
  const {id} = q.params;
  if(logs_data[id])
  {
    logs_data.splice(id,1);
    s.send(`index ${id} deleted`);
  }
  else
  {
    s.status(304).send("id not found");

  }
})


logs.put("/", ( q, s )=>{
  const {id} = q.params;
  if(logs_data[id]&&verify_data(q.body))
  {
    
    logs_data[id]=q.body;
    s.send(`index ${id} replaced`);
  }
  else
  {
    s.status(304).send("invaild data");
  }
})

function verify_data(body)
{
  return typeof body.captainName === "string"&&
  typeof body.title === "string"&&
  typeof body.post === "string"&&
  typeof body.mistakesWereMadeToday === "boolean"&&
  !Number.isNaN(Number(body.daysSinceLastCrisis))  
}


module.exports = logs;
