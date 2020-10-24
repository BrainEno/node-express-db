const express = require('express')
const Lessons= require('../models/dbhelper')

const router=express.Router()

router.get('/:id',(req,res)=>{
    Lessons.findMessageById(req.params.id)
    .then(message=>{
        if(message){
            res.status(200).json(message)
        }else{
            res.status(404).json({message:`message with id:${id} not found`})
        }
    }).catch(error=>{
        console.log(error)
        res.status(500).json({message:"faild to find message by messageId"})
    })
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    
    Lessons.removeMessage(id)
    .then(count=>{
        if(count>0){
            res.status(200).json({message:`Message with ${id} successfully deleted`})
        }else{
            res.status(404).json({message:'No message with that id'})
        }
    })
    .catch(error=>{
        res.status(500).json({message:'Unable to delete message'})
    })
})

router.patch('/:id',(req,res)=>{
    Lessons.updateMessage(req.params.id,req.body)
    .then(message=>{
        if(message){
            res.status(200).json(message)
        }else{
            res.status(404).json({message:"无法找到可更新的message"})
        }
    }).catch(error=>{
        console.log(error)
        res.status(500).json({message:"更新message错误"})
    })
})

module.exports=router;