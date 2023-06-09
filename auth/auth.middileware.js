const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try{
       const decoded=jwt.verify(token,process.env.secret)
       if(decoded){
        req.body.userID=decoded.userID
        req.body.user=decoded.user
        
        next()
       }else{
        res.json({msg:"Not authorized!!"})
       }
        }catch(err){
         res.json({err:err.message})
        }
    }else{
        res.json({msg:"Please login!!"})
    }
}

module.exports=auth