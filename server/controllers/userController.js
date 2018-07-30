const jwt = require("jsonwebtoken");
const User = require("../Schemes/User");
const { jwtKey } = require("../config");

exports.registerUser = function (req, res) {
    let checker = false;
    User.findOne({ login: req.body.login }, (err, checkedUserLogin) => {
        if (err) {
            return res.status(500);
        }

        if (checkedUserLogin) {
            return res.status(400).send("Username is already taken");
        }

        User.findOne({ email: req.body.email }, (error, checkedUserEmail) => {
            if (error) {
                checker = true;
                return res.status(500);
            }
            if (checkedUserEmail) {
                checker = true;
                return res.status(400).send("Account already exists.");
            }
        });
        if (checker) {
            return null;
        }
        const regUser = new User(req.body);
        regUser.password = regUser.encryptPassword(req.body.password);
        const token = jwt.sign({ login: req.body.login }, jwtKey, {
            expiresIn: 60 * 60 * 24
        });
        regUser.save((saveErr) => {
            if (saveErr) {
                return res.status(500);
            }
            return res.send({ user: regUser, token });
        });
    });
};


exports.loginUser = function (req, res) {
    let authField = "";
    if (req.body.login.indexOf("@") === -1) authField = "login";
    else authField = "email";
    User.findOne({ [authField]: req.body.login }, (err, user) => {
        if (err) {
            res.sendStatus(500);
        }

        if (!user) {
            return res.status(400).send("Incorrect login or password");
        }

        if (!user.comparePassword(req.body.password, user.password)) {
            return res.status(400).send("Incorrect login or password");
        }

        const token = jwt.sign({ login: req.body.login }, jwtKey, {
            expiresIn: 60 * 60 * 24
        });
        return res.send({ user, token });
    });
};

exports.getProfile = function (req, res) {
    User.findOne({ login: res.locals.login }, "-password", (err, user) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }

        if (!user) {
            return res.sendStatus(400);
        }

        return res.send(user);
    });
};

exports.updateUserInfo = function (req, res) {
    User.find({}, "-password", (err, allUsers) => {
        if (err) {
            return res.sendStatus(500);
        }

        const checkEmail = allUsers.every((user) => {
            if (user.email !== req.body.email) return true;
            if (user._id == req.body.id) return true;
            return false;
        });
        if (!checkEmail) {
            return res.status(400).send("This email is already in use");
        }

        let userToUpdate = allUsers.filter(user => user._id == req.body.id)[0];
        if (!userToUpdate) {
            return res.status(400).send("User doesn't exist");
        }

        delete req.body.id;
        req.body.skillList = req.body.skillList.split(", ");
        if (req.body.skillList[0] === "") {
            req.body.skillList = [];
        }

        userToUpdate = Object.assign(userToUpdate, req.body);
        userToUpdate.save((saveErr) => {
            if (saveErr) {
                return res.sendStatus(500);
            }
            const response = {
                userToUpdate,
                allUsers,
                message: "Your profile has been updated."
            };
            return res.send(response);
        });
    });
};
