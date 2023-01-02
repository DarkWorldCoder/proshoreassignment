import express,{Response,Request} from 'express'
import userRoutes from "./routes/user"
import todosRoutes from "./routes/todo"
import cors from 'cors'
import dotenv from 'dotenv'
import "express-async-errors"
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
const main = ()=>{
dotenv.config()
const app = express()
app.set('trust proxy',true)
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())

app.use("/api/user",userRoutes)
app.use("/api/todos",todosRoutes)
app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})

app.use("*",(req,res)=>{
    throw new NotFoundError()
})
app.use(errorHandler)
const PORT  = process.env.PORT || 6001
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})
}

main()