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
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUser = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../models/user.model");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(req.params.id)) {
        try {
            const user = yield user_model_1.UserModel.findById(req.params.id);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(500).json({ message: "Could not find user" });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    else {
        res.status(500).json({ message: "Could not find user" });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_model_1.UserModel.create(req.body);
        res.status(200).json(newUser);
    }
    catch (err) {
        res.status(500).json({ "message": "could not create user" });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(req.params.id)) {
        try {
            const newUser = yield user_model_1.UserModel.findByIdAndUpdate(req.params.id, req.body);
            if (!newUser) {
                res.status(500).json({ "message": "User not found" });
            }
            else {
                res.status(200).json({ "message": "User updated" });
            }
        }
        catch (err) {
            res.status(500).json({ err: err.message });
        }
    }
    else {
        res.status(500).json({ "message": "Invalid user Id" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(req.params.id)) {
        try {
            const deletedUser = yield user_model_1.UserModel.findByIdAndDelete(req.params.id);
            if (deletedUser) {
                res.status(200).json({ message: "User sucefully deleted" });
            }
            else {
                res.status(500).json({ message: "Could not delete user" });
            }
        }
        catch (err) {
            res.status(500).json(err.message);
        }
    }
    else {
        res.status(500).json({ "message": "Invalid user Id" });
    }
});
exports.deleteUser = deleteUser;
