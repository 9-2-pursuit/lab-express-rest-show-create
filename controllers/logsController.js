
const logsArray=require("../models/logs")
const express=require("express")
const logs=express.Router()


logs.get("/",(req,res)=>{
   
    res.send(logsArray)
})

logs.get("/:id",(req,res)=>{
    const {id}=req.params
    if (logsArray[Number(id)]) {
        res.json(logsArray[id]);
      } else {
        res.redirect("/logs")
      }
})

logs.post("/",(req,res)=>{
    logsArray.push(req.body)
    res.send(logsArray)
})

logs.put("/:id",(req,res)=>{
    const {id}=req.params
    logsArray[id]=req.body
    res.send(logsArray)
})

logs.delete("/:id",(req,res)=>{
    const {id}=req.params
    const deletedLog= logsArray.splice(id,1)
    res.status(200).json(deletedLog)
})


module.exports=logs