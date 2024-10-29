import {Schema, Types, model} from "mongoose";
const UserSchema  = new Schema ({
    name: {
        type: String,
        required: true,
        default: "",
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    dataCriacao:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    tasks: [{ type: Types.ObjectId, ref: "Task", required: true}]
})

export const UserModel = model("user", UserSchema);