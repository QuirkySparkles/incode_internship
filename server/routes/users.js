const app = require("express");
const checkAuth = require("../middlewares/checkAuth");

const router = app.Router();
const UserController = require("../controllers/userController");

router.post("/login", UserController.loginUser);

router.get("/profile", checkAuth, UserController.getProfile);

router.post("/registration", UserController.registerUser);

router.put("/edit", UserController.updateUserInfo);

module.exports = router;
