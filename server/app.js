const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const boardRouter = require("./routes/board");
const {
    dbUser,
    password,
    uri,
    db,
    corsOptions
} = require("./config");

const dbAddress = `mongodb://${dbUser}:${password}@${uri}/${db}`;


mongoose.connect(dbAddress, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log("Connected to DB!");
});

const app = express();

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.sendStatus(200);
    } else next();
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);
app.use("/board", boardRouter);


app.listen(3030);
