const express = require('express')
const Lessons= require('../models/dbhelper')

const router=express.Router()

//添加数据
router.post('/',(req,res)=>{
    Lessons.add(req.body)
    .then(lesson=>{
        res.status(200).json(lesson)
    })
    .catch(error=>{
        res.status(500).json({message:'添加数据失败'})
    })
})

//获取全部数据
router.get('/',(req,res)=>{
    Lessons.find()
    .then(lessons=>{
        res.status(200).json(lessons)
    })
    .catch(error=>{
        res.status(500).json({message:"获取失败"})
    })
})

//根据id获取数据
router.get('/:id',(req,res)=>{
    Lessons.findById(req.params.id)
    .then(lesson=>{
        if(lesson){
            res.status(200).json(lesson)
        }else{
            res.status(404).json({message:"数据查找失败"})
        }
       
    })
    .catch(error=>{
        res.status(500).json({message:'无法执行操作'})
    })
})

//删除数据
router.delete('/:id',(req,res)=>{
    Lessons.remove(req.params.id)
    .then(count=>{
        if (count>0){
            res.status(200).json({message:'已成功删除'})
        }else{
            res.status(404).json({mesage:'无法找到记录'})
        }
    })
    .catch(error=>{
        res.status(500).json({message:"无法执行操作"})
    })
})

//根据id更新数据
router.patch('/:id',(req,res)=>{
    Lessons.update(req.params.id,req.body)
    .then(lesson=>{
        if(lesson){
            res.status(200).json(lesson)
        }else{
            res.status(404).json({message:"无法找到可更新的记录"})
        }
    }).catch(error=>{
        res.status(500).json({message:"更新操作错误"})
    })
})

//addMessage
router.post('/:id/messages',(req,res)=>{
    const {id} =req.params;
    const msg = req.body;

    if (!msg.lesson_id){
        msg['lesson_id']=parseInt(id,10)
    }

    Lessons.findById(id)
    .then(lesson=>{
        if (!lesson) {
            res.status(404).json({message:'Invalid id'})
        }
        //check for all required fields
        if (!msg.sender || !msg.text){
            res.status(400).json({message:'Must provide both sender and text values'})
        }

        Lessons.addMessage(msg,id)
        .then(message=>{
            if (message){
                res.status(200).json(message)
            }
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json({message:"Failed to add message"})
        })
    })
    .catch(error=>{
        res.status(500).json({message:'Error finding lesson'})
    })
})

router.get('/:id/messages',(req,res)=>{
    const {id} = req.params;

    Lessons.findLessonMessages(id)
    .then(lessons=>{
        res.status(200).json(lessons)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"Error retrieving messages"})
    })
})


module.exports=router;