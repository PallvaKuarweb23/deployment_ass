const jwt =require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"shhhhh",(err,decoded)=>{
            if(decoded){
                next()
            }else{
                res.send({"msg":"Please Login !!"})
            }
        })
        
    }else{
            res.send({"msg":"Please Login !!"})
    }
}

module.exports={
    auth
}