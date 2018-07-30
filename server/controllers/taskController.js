const Task = require("../Schemes/Task");

exports.addTask = function (req, res) {
    const task = new Task(req.body);
    task.save((err) => {
        if (err) {
            return res.status(500);
        }
        Task.find({}, (findErr, tasks) => {
            if (findErr) {
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
        if (err) {
            return res.sendStatus(500);
        }
        Task.find({}, (findErr, tasks) => {
            if (findErr) {
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
            return res.sendStatus(500);
        }
        return res.send({ tasks });
    });
};

exports.changeTaskStatus = function (req, res) {
    Task.findById(req.body.id, (err, task) => {
        if (err) {
            return res.sendStatus(500);
        }
        task.status = req.body.status;
        task.save((saveErr, updTask) => {
            if (saveErr) {
                return res.sendStatus(500);
            }
            Task.find({}, (error, allTasks) => {
                if (error) {
                    return res.sendStatus(500);
                }
                const profileTasks = allTasks.filter(boardTask => (
                    boardTask.performerId === req.body.performerId
                ));
                return res.send({ allTasks, profileTasks, updTask });
            });
        });
    });
};

exports.addComment = function (req, res) {
    Task.findById(req.body.id, (err, task) => {
        if (err) {
            return res.sendStatus(500);
        }
        task.comments.push(req.body.comment);
        task.save((saveErr) => {
            if (saveErr) return res.sendStatus(500);
            Task.find({}, (findErr, allTasks) => {
                if (findErr) {
                    return res.sendStatus(500);
                }
                const response = {
                    allTasks,
                    task
                };
                return res.send(response);
            });
        });
    });
};

exports.deleteComment = function (req, res) {
    Task.findById(req.params.id, (err, task) => {
        if (err) {
            return res.sendStatus(500);
        }
        task.comments = task.comments.filter(comment => comment.createdAt !== req.params.createdAt);
        task.save((saveErr) => {
            if (saveErr) {
                return res.sendStatus(500);
            }
            Task.find({}, (findErr, allTasks) => {
                if (findErr) {
                    return res.sendStatus(500);
                }
                const response = {
                    allTasks,
                    task
                };
                return res.send(response);
            });
        });
    });
};

exports.editTask = function (req, res) {
    Task.findById(req.body.id, (err, taskToEdit) => {
        if (err) {
            return res.sendStatus(500);
        }
        const updTask = Object.assign(taskToEdit, req.body.editedTask);
        updTask.save((saveErr) => {
            if (saveErr) {
                return res.sendStatus(500);
            }
            Task.find({}, (error, tasks) => {
                if (error) {
                    return res.sendStatus(500);
                }
                const payLoad = {
                    tasks,
                    message: "Task has been updated."
                };
                return res.send(payLoad);
            });
        });
    });
};
