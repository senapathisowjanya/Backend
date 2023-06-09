const express = require('express');
const noteModel = require('../model/note.schema');
const auth = require('../auth/auth.middileware');
const noteRouter=express.Router()

noteRouter.use(auth)

noteRouter.get("/",async(req,res)=>{
try{
    console.log(req.body.userID)
    const user=await noteModel.find({userID:req.body.userID})
    res.json({user})
}catch(err){
res.json({err:err.message})
}

})

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    console.log(payload)
   try{
    const note=new noteModel(payload)
    await note.save()
    res.json({msg:"noted added successfully",note:payload})
   }catch(err){
    res.json({err:err.message})
   }
})
noteRouter.patch("/update/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const noteID=req.params.noteID
   
   try{
    const note=await noteModel.findOne({_id:noteID})
    const userIDinNoteDoc=note.userID
    if(userIDinUserDoc===userIDinNoteDoc){
        await noteModel.findByIdAndUpdate({_id:noteID},req.body)
        res.json({msg:`${note.title} has been updated`})
      }else{
          res.json({msg:"Not authorized"})
      }

   }catch(err){
    res.json({error:err.message})
   }
   
})
noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const noteID=req.params.noteID
   
   try{
    const note=await noteModel.findOne({_id:noteID})
    const userIDinNoteDoc=note.userID
    if(userIDinUserDoc===userIDinNoteDoc){
        await noteModel.findByIdAndDelete({_id:noteID})
        res.json({msg:`${note.title} has been Deleted`})
      }else{
          res.json({msg:"Not authorized"})
      }

   }catch(err){
    res.json({error:err.message})
   }
    
    
})


module.exports =noteRouter