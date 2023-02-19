const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/Note.model")



noteRouter.post("/create",async(req,res)=>{
   const payload=req.body
   const new_note=new NoteModel(payload)
   await new_note.save()
   res.send({"msg":"Note Created"})
})


noteRouter.get("/",async(req,res)=>{
    const notes=await NoteModel.find({user})
    res.send("All the notes")
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":`Note with id:${noteID} has been deleted`})
})

module.exports={
    noteRouter
}