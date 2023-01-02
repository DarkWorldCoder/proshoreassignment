import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { Request,Response,NextFunction } from 'express'
const prisma = new PrismaClient()

const protect = async(req:Request,res:Response,next:NextFunction)=>{
  let token 

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ){
    try{
     token = req.headers.authorization.split(" ")[1]
     const decoded = jwt.verify(token,process.env.JWT_KEY)

     const user  = await prisma.user.findUnique({
        where:{
            id:decoded.id
        }
     }) 

     next()
    }
    catch(error){
        res.status(401)
        throw new Error('Not authorized, token failed')
    }
  }
  if(!token){
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

export {
    protect
}