const User = require("../Schemes/User");
const Task = require("../Schemes/Task");

exports.getBoardData = function (req, res) {
    let allUsers;
    let allTasks;
    const promise = User.find({}, "-password").exec();
    promise.then((users) => {
        allUsers = users;
        return Task.find({});
    })
    .then((tasks) => {
        allTasks = tasks;
        res.send({ allUsers, allTasks });
    })
    .catch((err) => {
        res.sendStatus(500);
        throw err;
    });
};
