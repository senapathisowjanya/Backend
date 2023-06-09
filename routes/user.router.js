const express = require('express');
const userModel = require('../model/user.shema');
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter=express.Router()
require("dotenv").config()

userRouter.post("/register",(req,res)=>{
    const {name,email,pass,age}=req.body
    try{
        bcrypt.hash(pass,3,async(err, hash)=>{
            const user=new userModel({name,email,pass:hash,age})
            await user.save()
            res.json({msg:"user has been registered",user})
        });
    }catch(err){
     res.json({err:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await userModel.findOne({email:email})
        if(user){
            bcrypt.compare(pass,user.pass,(err, result)=>{
           if(result){
            const  token = jwt.sign({userID:user._id,user:user.name},process.env.secret);
            res.json({msg:"Login successful",token:token})
           }else{
            res.json({msg:"wrong credentials"})
           }
            });
        }else{
            res.json({msg:"Please register first!!!"})
        }
    }catch(err){
   res.json({err:err.message})
    }
})

module.exports=userRouter