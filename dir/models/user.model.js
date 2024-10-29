"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    tasks: [{ type: mongoose_1.Types.ObjectId, ref: "Task", required: true }]
});
exports.UserModel = (0, mongoose_1.model)("user", UserSchema);
