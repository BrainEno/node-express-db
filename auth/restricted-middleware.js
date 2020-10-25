const { JsonWebTokenError } = require("jsonwebtoken")

const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    //-----------express session version code---------------------------------//
    // console.log('req.session', req.session)
    // if (req.session&&req.session.user){
    //     next()
    // }else{
    //     res.status(401).json({message:'Sorry dude/dudette,cannot let you in'})
    // }
   

    //-----------jwt version---------------------------------------------------//
    const token = req.headers.authorization
    const secret= process.env.SECRET

    if(token){
        jwt.verify(token,secret,(err,decodedToken)=>{
            if (err){
                res.status(401).json({message:'Invalid token received'})
            }else{
                req.decodedToken=decodedToken
                next()
            }
        })
    }else{
        res.status(401).json({message:'No token received'})
    }

}