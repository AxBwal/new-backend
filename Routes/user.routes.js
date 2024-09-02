const express=require("express")
const router=express.Router()

const {createuser}=require("../Controller/user.controller")

router.post("/signup",createuser)


module.exports=router