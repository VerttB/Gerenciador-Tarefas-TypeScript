"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
const status_1 = require("../enums/status");
exports.taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        default: "",
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: status_1.Status
    },
    dataCriacao: {
        type: Date,
        default: Date.now(),
    },
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
});
exports.taskModel = (0, mongoose_1.model)("task", exports.taskSchema);
