
import { isValidObjectId } from "mongoose";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model"
export const getUser = async (req : Request,res : Response) => {
    if(isValidObjectId(req.params.id)){
        try{
            const user = await UserModel.findById(req.params.id);
            if(user){
                res.status(200).json(user);
            }
            else{
                res.status(500).json({message: "Could not find user"});
            }
        }
        catch(err: any){
            res.status(500).json({message: err.message});
        }
    }
    else{
        res.status(500).json({message: "Could not find user"})
    }
}
export const postUser = async (req : Request,res : Response) => {
    try{
        const newUser = await UserModel.create(req.body);
        res.status(200).json(newUser);
    }
    catch(err) {
        res.status(500).json({"message": "could not create user"})
    }
}
export const updateUser = async (req : Request,res : Response) => {
    if(isValidObjectId(req.params.id)){
    try{
        const newUser = await UserModel.findByIdAndUpdate(req.params.id, req.body);
        if(!newUser){
            res.status(500).json({"message": "User not found"});
        }
        else{
            res.status(200).json({"message": "User updated"});
        }
    }
    catch (err: any) {
        res.status(500).json({err: err.message})
    }
}
else{
    res.status(500).json({"message": "Invalid user Id"})
}
}

export const deleteUser = async (req : Request,res : Response) => {
   if(isValidObjectId(req.params.id)){
        try{
            const deletedUser = await UserModel.findByIdAndDelete(req.params.id)
            if(deletedUser){
                res.status(200).json({message: "User sucefully deleted"})
            }
            else{
                res.status(500).json({message: "Could not delete user"})
            }
        }
        catch(err: any){
            res.status(500).json(err.message);
        }
   }
   else{
    res.status(500).json({"message": "Invalid user Id"})
   }
}