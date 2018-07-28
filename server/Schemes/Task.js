const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskSchema = new Schema({
    title: String,
    shortDescription: String,
    fullDescription: String,
    status: {
        type: String,
        default: "To Do"
    },
    performer: String,
    performerId: String,
    comments: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Task", taskSchema);
