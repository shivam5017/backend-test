const express = require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/User.routes")
const {noteRouter}=require("./routes/Note.routes")
const { authenticate } = require("./middlewares/authenticate.middleware")
const app=express()
require("dotenv").config()
const cors=require("cors")
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use(authenticate)
app.use("/note",noteRouter)
app.get("/",(req,res)=>{
    res.send("home")
})


app.listen(process.env.port,async()=>{
    try{
     await connection
     console.log("connected to db")
    }catch(err){
      console.log(err.message)
    }
    console.log("Server runs at port 9000")
})