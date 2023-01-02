import { Request,Response } from 'express'
import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'
import { Password } from '../service/password'
import { decode } from 'punycode'
const prisma = new PrismaClient()
export const authUser = async(req:Request,res:Response)=>{
    
    const {email,password} = req.body 
    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(!existingUser){
        return res.status(400).send({errors:[{message:"Invalid Credentials"}]})
    }

    const passwordMatch = await Password.compare(existingUser.password,password)
    if(!passwordMatch){

        return res.status(400).send({errors:[{message:"Invalid Credentials"}]})
    }
    
    delete existingUser.password
    const userJwt = jwt.sign({
        id:existingUser.id,
        email:existingUser.email
    },process.env.JWT_KEY)
    
    res.status(201).json({user:existingUser,jwt:userJwt})

    
    
}

export const createUser = async(req:Request,res:Response)=>{

    const {email,password} = req.body 
    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(existingUser){
        return res.status(400).send({errors:[{message:"Email Already Exists"}]})
    }

    const hashedPassword = await Password.toHash(password)
    const userCreated = await prisma.user.create({
        data:{
            email:email,
            password:hashedPassword
        }
    })
    
    
    delete userCreated.password

    const userJwt = jwt.sign({
        id:userCreated.id,
        email:userCreated.email
    },process.env.JWT_KEY)
    
    res.status(201).json({user:userCreated,jwt:userJwt})

    
    
}

export const loginWithToken = async(req:Request,res:Response)=>{
    try{
        const token = req.query.token
        
       
        if(token !==null && token){
            
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id
            }
        })
        // console.log(user)
        if(user){
            const userJwt = jwt.sign({
                id:user.id,
                email:user.email
            },process.env.JWT_KEY)
            return res.status(200).json({user,jwt:userJwt})
        }
        else{
            return res.status(200).json({message:"user not found"})
        }
        
        
        }
    
    }catch(error){
        return res.status(400).send("")
    }
    

}