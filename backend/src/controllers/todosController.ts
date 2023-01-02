import { Request,Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export const getAllTodos = async(req:Request,res:Response)=>{
    const {id}= req.params
    console.log(id)
    const todos = await prisma.todos.findMany({where:{
        userId:id
    }})
    if(todos.length>0){

        res.send(todos)
    }
    else{
        return res.json({message:"No task"})
    }
}
export const addTodos = async(req:Request,res:Response)=>{
    const {userId,description,label} = req.body
    console.log(label)
    const todoCreated = await prisma.todos.create({
        data:{
            userId,
            description,
            label
            

        }
    })
    if(todoCreated){
        res.status(201).json({todo:todoCreated})
    }
    else{
        res.status(201).json({message:"Failed to create"})
    }
}

export const updateCompleted = async(req:Request,res:Response)=>{
    const {id,completed} = req.body
   try{
    const updated = await prisma.todos.update({
        where:{
            id:id
        },
        data:{
            completed:completed
        }
    })
    if(updated){
        return res.status(201).json({completed:updated.completed})
    }
    else{
        return res.status(201).json({completed:completed})

    }
}catch(error){
    return res.status(201).json({completed:completed})
}
    
}