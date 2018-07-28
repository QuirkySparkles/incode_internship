const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
    login: String,
    password: String,
    firstName: {
        type: String,
        default: "User"
    },
    lastName: {
        type: String,
        default: "User"
    },
    birthDate: {
        type: String,
        default: ""
    },
    email: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    skillList: {
        type: Array,
        default: []
    }
});


userSchema.methods.encryptPassword = password => (
    bcrypt.hashSync(password, bcrypt.genSaltSync(10))
);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
