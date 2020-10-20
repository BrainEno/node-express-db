const express = require('express')
const Lessons= require('./models/dbhelper')

const server = express()


server.use(express.json())

const PORT= 5000;

server.get('/',(req,res)=>{
    res.json({messsge:'Big brother is watching you!'})
})

//添加数据
server.post('/api/lessons',(req,res)=>{
    Lessons.add(req.body)
    .then(lesson=>{
        res.status(200).json(lesson)
    })
    .catch(error=>{
        res.status(500).json({message:'添加数据失败'})
    })
})

//获取全部数据
server.get('/api/lessons',(req,res)=>{
    Lessons.find()
    .then(lessons=>{
        res.status(200).json(lessons)
    })
    .catch(error=>{
        res.status(500).json({message:"获取失败"})
    })
})

//根据id获取数据
server.get('/api/lessons/:id',(req,res)=>{
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
server.delete('/api/lessons/:id',(req,res)=>{
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
server.patch('/api/lessons/:id',(req,res)=>{
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

server.listen(PORT,()=>{
    console.log(`\*** server running on port http://localhost:${PORT} ***\n`)
})