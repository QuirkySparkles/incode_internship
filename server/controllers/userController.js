const jwt = require("jsonwebtoken");
const User = require("../Schemes/User");
const { jwtKey } = require("../config");

exports.registerUser = function (req, res) {
    User.findOne({ login: req.body.login }, (err, user) => {
        if (err) return res.status(500);
        if (user) return res.status(400).send({ message: "Username is already taken" });
        User.findOne({ email: req.body.email }, (error, user1) => {
            if (error) return res.status(500);
            if (user1) return res.status(400).send({ message: "Account already exists." });
            const regUser = new User(req.body);
            regUser.password = regUser.encryptPassword(req.body.password);
            const token = jwt.sign(req.body.login, jwtKey);
            regUser.save((saveErr) => {
                if (saveErr) {
                    return res.status(500);
                }
                return res.send({ user: regUser, token });
            });
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
            throw err;
        }
        if (!user) return res.status(400).send({ message: "Incorrect login or password" });
        if (!user.comparePassword(req.body.password, user.password)) return res.status(400).send({ message: "Incorrect login or password" });
        const token = jwt.sign(user.login, "iamalive");
        return res.send({ user, token });
    });
};

exports.getProfile = function (req, res) {
    User.findOne({ login: res.locals.login }, "-password", (err, user) => {
        if (err) {
            res.sendStatus(500);
            throw err;
        }
        if (!user) return res.sendStatus(400);
        return res.send(user);
    });
};

exports.updateUserInfo = function (req, res) {
    User.findById(req.body.id, "-password", (err, user) => {
        if (err) return res.sendStatus(500);
        delete req.body.id;
        req.body.skillList = req.body.skillList.split(", ");
        if (req.body.skillList[0] === "") req.body.skillList = [];
        user = Object.assign(user, req.body);
        user.save((saveErr) => {
            if (saveErr) return res.sendStatus(500);
            const response = {
                user,
                message: "Your profile has been updated."
            };
            return res.send(response);
        });
    });
};
