import { Router } from "express";
import { deleteTask, getUserTasks, postTask } from "../controllers/task.controller";
const taskRouter = Router();

taskRouter.get("/user/:id/task", getUserTasks);
taskRouter.post("/user/:id/task", postTask);
taskRouter.delete("/user/:idUser/task/:idTask", deleteTask);
export default taskRouter