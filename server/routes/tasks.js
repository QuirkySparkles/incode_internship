const app = require("express");
const checkAuth = require("../middlewares/checkAuth");

const router = app.Router();
const TaskController = require("../controllers/taskController");

router.post("/user_tasks", checkAuth, TaskController.getUserTasks);
router.put("/status", checkAuth, TaskController.changeTaskStatus);
router.put("/comment", checkAuth, TaskController.addComment);
router.post("/add", checkAuth, TaskController.addTask);
router.delete("/delete/:id", checkAuth, TaskController.deleteTask);

module.exports = router;
