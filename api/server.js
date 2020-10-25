const express = require('express')
// const session= require('express-session')
const lessonsRouter= require('../Routes/lessons-routes')
const messagesRouter= require('../Routes/messages-routes')
const authRouter= require('../auth/auth-routes')
const usersRouter = require('../Routes/users-routes')
const restricted= require('../auth/restricted')

const server = express()

// const sessionConfig={
//     name:'demon',  //name of cookie
//     secret:process.env.SECRET,  //secret that makes the cookie effective
//     cookie:{
//         maxAge:1000 * 60 * 60,  //time span of the cookie
//         secure:false,  //for production set to true for https only access
//         httpOnly:true,  //true means no access from javascript
//     },
//     resave:false,
//     saveUninitialized:true, //GDPR laws user has to give consent,在production模式中要由客户端设置为false
// }

server.use(express.json())
// server.use(session(sessionConfig))

server.get('/',(req,res)=>{
    res.json({messsge:'Big brother is watching you!'})
})

server.use('/api/auth',authRouter)
server.use('/api/lessons',restricted,lessonsRouter)
server.use('/api/messages',restricted,messagesRouter)
server.use('/api/users',restricted,usersRouter)

module.exports=server