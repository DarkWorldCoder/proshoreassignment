import express from "express"
import { protect } from "../middlewares/authMiddleware"
import { addTodos, getAllTodos, updateCompleted } from "../controllers/todosController"

const router = express.Router()

router.route("/add-todos").post(protect,addTodos)
router.route("/:id").get(protect,getAllTodos)
router.route("/").patch(protect,updateCompleted)

export default router