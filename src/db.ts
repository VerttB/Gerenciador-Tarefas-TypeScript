import { connect } from 'mongoose';
export function connectToDb(cb : (err?: string) => void) {
    connect("mongodb+srv://vert:cuJ7w41z31cqidSd@mongodb.stk68.mongodb.net/CRUD?retryWrites=true&w=majority&appName=MongoDB")
        .then(() => {
            console.log("Connected to DB");
            return cb();

        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
}