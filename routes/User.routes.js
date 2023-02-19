const express=require("express")
const {UserModel}=require("../model/User.model")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//register route
userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        const user=await UserModel.find({email})
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err) res.send({"msg":"Something went wrong","error":err.message})
            else if(user.length!=0){
                res.send({"msg":"User already registered"})
            }
            else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"New User has been registered"})
            }
        });
       
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
  
})


//login route
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai",{
                        expiresIn:"1h"
                    })
                    res.send({"msg":"Logged In","token":token})
                }else{
                    res.send({"msg":"wrong credentials"})
                }

            });
          
        }else{
            res.send({"msg":"wrong credentials"})
        }
        
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
    
})


module.exports={
    userRouter
}