const app = require("express");
const checkAuth = require("../middlewares/checkAuth");

const router = app.Router();
const BoardController = require("../controllers/boardController");

router.get("/", checkAuth, BoardController.getBoardData);

module.exports = router;
