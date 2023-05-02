const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");



const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,city,age}=req.body

    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(err){
                res.send({"msg":"Something went wrong","error":err.message})
            }else{
                const user=new UserModel({name,email,password:hash,city,age})
                await user.save()
                res.status(200).send({"msg":"New User is Registered"})
            }
        });


    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})



userRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
try{
    const user=await UserModel.findOne({email})
    if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({foo:`bar`},`shhhhh`)
                res.status(200).send({"msg":"Login Successful","token":token})

            }else{
                res.status(200).send({"msg":"Wrong Credential!!!!"})
            }
        })
    }else{
        res.status(200).send({"msg":"Wrong Credential!!!!"})

    }

}catch(err){
    res.send({"msg":"Something went wrong","error":err.message})
}
})



module.exports={
    userRouter
}