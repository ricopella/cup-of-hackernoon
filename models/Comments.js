const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let CommentsSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String
    }
});

let Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;