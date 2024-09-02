const express=require("express")
const app=express()
require("dotenv").config()

app.use(express.json())

const PORT=process.env.PORT || 5000

const userRouter=require("./Routes/user.routes")
app.use("/v1",userRouter)

const DataBase=require("./DataBase/db")
DataBase()

app.get("/",(req,res)=>{
    res.send("Everything is ok")
})

app.listen(PORT,()=>{
    console.log("server is started");
    
})