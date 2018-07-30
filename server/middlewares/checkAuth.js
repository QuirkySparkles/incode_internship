const jwt = require("jsonwebtoken");
const User = require("../Schemes/User");
const { jwtKey } = require("../config");

module.exports = function (req, res, next) {
    let userLogin;
    let checker = false;
    jwt.verify(req.headers.authorization, jwtKey, (err, decoded) => {
        if (err) {
            checker = true;
            if (err.message === "jwt expired") {
                return res.status(401).send("Session time expired");
            }

            return res.status(401).send("You must be logged in to perform this action");
            }
            userLogin = decoded.login;
        });
        if (checker) return;
    User.findOne({ login: userLogin }, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        if (!user) return res.sendStatus(401);
        res.locals.login = userLogin;
        return next();
    });
};
