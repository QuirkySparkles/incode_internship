const Task = require("../Schemes/Task");

exports.addTask = function (req, res) {
    const task = new Task(req.body);
    task.save((err) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        Task.find({}, (findErr, tasks) => {
            if (findErr) {
                console.log(findErr);
                return res.sendStatus(500);
            }
            const response = {
                message: "Task succefully created",
                tasks
            };
            return res.send(response);
        });
    });
};

exports.deleteTask = function (req, res) {
    Task.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.sendStatus(500);
        Task.find({}, (findErr, tasks) => {
            if (findErr) {
                console.log(findErr);
                return res.sendStatus(500);
            }
            return res.send({ tasks });
        });
    });
};

exports.getUserTasks = function (req, res) {
    Task.find({
        performerId: req.body.performerId
    }, (err, tasks) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.send({ tasks });
    });
};

exports.changeTaskStatus = function (req, res) {
    Task.findById(req.body.id, (err, task) => {
        if (err) return res.sendStatus(500);
        task.status = req.body.status;
        task.save((saveErr, updTask) => {
            if (saveErr) return res.sendStatus(500);
            Task.find({ performerId: req.body.performerId }, (error, tasks) => {
                if (error) {
                    console.log(error);
                    return res.sendStatus(500);
                }
                return res.send({ tasks, updTask });
            });
        });
    });
};

exports.addComment = function (req, res) {
    Task.findById(req.body.id, (err, task) => {
        if (err) return res.sendStatus(500);
        task.comments.push(req.body.comment);
        task.save((saveErr) => {
            if (saveErr) return res.sendStatus(500);
            return res.send({ task });
        });
    });
};
