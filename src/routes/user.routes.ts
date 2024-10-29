import { Router } from "express";
import { deleteUser, getUser, postUser, updateUser } from "../controllers/user.controller";
const Userrouter = Router();

Userrouter.get("/user/:id", getUser);
Userrouter.post("/user", postUser);
Userrouter.patch("/user/:id", updateUser);
Userrouter.delete("/user/:id", deleteUser);

export default Userrouter;