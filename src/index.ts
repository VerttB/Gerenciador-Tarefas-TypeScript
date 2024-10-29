import express from "express"
import { connectToDb } from "./db";
import router from "./routes/user.routes";
import taskRouter from "./routes/task.routes";

const app = express();
app.use(express.json());
app.use(router);
app.use(taskRouter);
connectToDb((err?: string) => {
    if(!err) {
        app.listen(3000, (err? : string) => {
            console.log("Server Iniciado")
    });
}
    else{
        console.log(err)
    }
});

app.get("/", (req, res) => {
    res.send({"message": "Server Iniciado"})
})

