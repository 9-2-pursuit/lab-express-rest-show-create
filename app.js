const express=require("express")

const app=express()
app.use(express.json())

const logs=require("./controllers/logsController")

app.use("/logs",logs)

app.get("/",(req,res)=>{
    res.send("welcome to the captains log")
})

module.exports=app