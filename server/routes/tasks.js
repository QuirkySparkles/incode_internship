const app = require("express");
const checkAuth = require("../middlewares/checkAuth");

const router = app.Router();
const TaskController = require("../controllers/taskController");

router.post("/user_tasks", checkAuth, TaskController.getUserTasks);
router.put("/status", checkAuth, TaskController.changeTaskStatus);
router.put("/comment", checkAuth, TaskController.addComment);
router.put("/edit", checkAuth, TaskController.editTask);
router.post("/add", checkAuth, TaskController.addTask);

router.delete("/delete/:id", checkAuth, TaskController.deleteTask);
router.delete("/delete_comment/:id/:createdAt", checkAuth, TaskController.deleteComment);

module.exports = router;
