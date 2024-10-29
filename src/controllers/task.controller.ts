import { isValidObjectId } from "mongoose";
import { query, Request, Response } from "express";
import { UserModel } from "../models/user.model"
import { taskModel } from "../models/task.model";

export const getUserTasks = async (req: Request, res: Response) => {
    const p = Number(req.query.p || 0);
    console.log(p)
    console.log(req.query.p)
    const maxPerPage = 5
    const userId = req.params.id;
    if(isValidObjectId(userId)) {
        try{
            const tasks = await taskModel
            .find({userId: userId})
            .limit(maxPerPage)
            .skip(p * maxPerPage);
            res.status(200).json(tasks);
        }
        catch(err: any){
            res.status(500).json(err.message);
        }
    }
    else {
        res.status(500).json({message: "Invalid user Id"})
    }
}

export const postTask = async (req: Request, res:Response) => {
    const userId = req.params.id;
    if(isValidObjectId(userId)) {
        try{
            const newTask = await taskModel.create(req.body);
            const updatedUser = await UserModel.updateOne({_id: userId}, {$push:{tasks: newTask._id}});
            res.status(200).json(newTask);
        }
        catch(err: any){
            res.status(500).json(err.message);
        }
    }
    else {
        res.status(500).json({message: "Invalid user Id"})
    }
    
}

export const deleteTask = async (req: Request, res: Response) => {
    const { userId, taskId } = req.params;

    if (isValidObjectId(userId) && isValidObjectId(taskId)) {
        try {
            const user = await UserModel.findOne({ _id: userId, tasks: taskId });
            if (!user) {
               res.status(403).json({ message: "Unauthorized: Task does not belong to this user" });
            }
            else{
            const deletedTask = await taskModel.findByIdAndDelete(taskId);
            if (!deletedTask) {
                res.status(404).json({ message: "Task not found" });
            }
            else{
            const updatedUser = await UserModel.updateOne(
                { _id: userId },
                { $pull: { tasks: taskId } }
            );
            res.status(200).json({ message: "Task deleted successfully" });
        }
    }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: "Invalid user ID or task ID" });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    const { userId, taskId } = req.params;
    if (isValidObjectId(userId) && isValidObjectId(taskId)) {
    try{
        const user = await UserModel.findOne({ _id: userId, tasks: taskId });
        if (!user) {
            res.status(403).json({ message: "Unauthorized: Task does not belong to this user" });
         }
         else{
            const updatedTask = await taskModel.findByIdAndUpdate(taskId, req.body);
            const updatedUser = await UserModel.updateOne(
                { _id: userId },
                { $pull: { tasks: taskId } }
            );
            res.status(200).json({ message: "Task deleted successfully" });
         }
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: "Invalid user ID or task ID" });
    }
} 