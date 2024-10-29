"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = connectToDb;
const mongoose_1 = require("mongoose");
function connectToDb(cb) {
    (0, mongoose_1.connect)("mongodb+srv://vert:cuJ7w41z31cqidSd@mongodb.stk68.mongodb.net/CRUD?retryWrites=true&w=majority&appName=MongoDB")
        .then(() => {
        console.log("Connected to DB");
        return cb();
    })
        .catch((err) => {
        console.log(err);
        return cb(err);
    });
}
