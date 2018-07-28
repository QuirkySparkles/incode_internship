const jwt = require("jsonwebtoken");
const User = require("../Schemes/User");
const { jwtKey } = require("../config");

module.exports = function (req, res, next) {
    const jwtPayload = jwt.verify(req.headers.authorization, jwtKey);
    User.findOne({ login: jwtPayload }, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) return res.sendStatus(401);
        res.locals.login = jwtPayload;
        return next();
    });
};
