"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(user_routes_1.default);
app.use(task_routes_1.default);
(0, db_1.connectToDb)((err) => {
    if (!err) {
        app.listen(3000, (err) => {
            console.log("Server Iniciado");
        });
    }
    else {
        console.log(err);
    }
});
app.get("/", (req, res) => {
    res.send({ "message": "Server Iniciado" });
});
