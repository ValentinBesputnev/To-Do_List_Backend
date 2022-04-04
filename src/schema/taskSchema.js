const mongoose = require("mongoose");

const { Schema } = mongoose;

const tasksSchema = new Schema({
    text: String,
    isCheck: Boolean
})

module.exports = mongoose.model('tasksSchema', tasksSchema)