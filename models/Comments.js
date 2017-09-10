const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let CommentsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

let Comments = mongoose.model("Comments", CommentsSchema, "comment");

module.exports = Comments;