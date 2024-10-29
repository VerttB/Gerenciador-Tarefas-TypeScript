"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const taskRouter = (0, express_1.Router)();
taskRouter.get("/user/:id/task", task_controller_1.getUserTasks);
taskRouter.post("/user/:id/task", task_controller_1.postTask);
taskRouter.delete("/user/:idUser/task/:idTask", task_controller_1.deleteTask);
exports.default = taskRouter;
