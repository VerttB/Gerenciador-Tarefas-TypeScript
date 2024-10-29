"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteTask = exports.postTask = exports.getUserTasks = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../models/user.model");
const task_model_1 = require("../models/task.model");
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if ((0, mongoose_1.isValidObjectId)(userId)) {
        try {
            const tasks = yield task_model_1.taskModel.find({ userId: userId });
            res.status(200).json(tasks);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    else {
        res.status(500).json({ message: "Invalid user Id" });
    }
});
exports.getUserTasks = getUserTasks;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    if ((0, mongoose_1.isValidObjectId)(userId)) {
        try {
            const newTask = yield task_model_1.taskModel.create(req.body);
            const updatedUser = yield user_model_1.UserModel.updateOne({ _id: userId }, { $push: { tasks: newTask._id } });
            res.status(200).json(newTask);
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    else {
        res.status(500).json({ message: "Invalid user Id" });
    }
});
exports.postTask = postTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, taskId } = req.params;
    if ((0, mongoose_1.isValidObjectId)(userId) && (0, mongoose_1.isValidObjectId)(taskId)) {
        try {
            const user = yield user_model_1.UserModel.findOne({ _id: userId, tasks: taskId });
            if (!user) {
                res.status(403).json({ message: "Unauthorized: Task does not belong to this user" });
            }
            else {
                const deletedTask = yield task_model_1.taskModel.findByIdAndDelete(taskId);
                if (!deletedTask) {
                    res.status(404).json({ message: "Task not found" });
                }
                else {
                    const updatedUser = yield user_model_1.UserModel.updateOne({ _id: userId }, { $pull: { tasks: taskId } });
                    res.status(200).json({ message: "Task deleted successfully" });
                }
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else {
        res.status(400).json({ message: "Invalid user ID or task ID" });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, taskId } = req.params;
    if ((0, mongoose_1.isValidObjectId)(userId) && (0, mongoose_1.isValidObjectId)(taskId)) {
        try {
            const user = yield user_model_1.UserModel.findOne({ _id: userId, tasks: taskId });
            if (!user) {
                res.status(403).json({ message: "Unauthorized: Task does not belong to this user" });
            }
            else {
                const updatedTask = yield task_model_1.taskModel.findByIdAndUpdate(taskId, req.body);
                const updatedUser = yield user_model_1.UserModel.updateOne({ _id: userId }, { $pull: { tasks: taskId } });
                res.status(200).json({ message: "Task deleted successfully" });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else {
        res.status(400).json({ message: "Invalid user ID or task ID" });
    }
});
exports.updateTask = updateTask;
