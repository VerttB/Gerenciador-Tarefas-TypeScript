import { Schema, model, Types} from "mongoose";
import { Status } from "../enums/status";
export const taskSchema  = new Schema({
        title: {
            type: String,
            default: "",
            required: true,
        },
        description: String,
        status:{
            type: String,
            enum: Status
        },
        dataCriacao: {
            type: Date,
            default: Date.now(),
        },
        userId: { type: Types.ObjectId, ref: "User", required: true },

});

export const taskModel = model("task", taskSchema);