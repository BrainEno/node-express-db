const express = require('express')
const Lessons= require('./models/dbhelper')

const server = express()


server.use(express.json())

const PORT= 5000;

server.get('/',(req,res)=>{
    res.json({messsge:'Big brother is watching you!'})
})

server.post('/api/lessons',(req,res)=>{
    Lessons.add(req.body)
    .then(lesson=>{
        res.status(200).json(lesson)
    })
    .catch(error=>{
        res.status(500).json({message:'cannot add lesson'})
    })
})

server.get('/api/lessons',(req,res)=>{
    Lessons.find()
    .then(lessons=>{
        res.status(200).json(lessons)
    })
    .catch(error=>{
        res.status(500).json({message:"Unable to get"})
    })
})

server.listen(PORT,()=>{
    console.log(`\*** server running on port http://localhost:${PORT} ***\n`)
})