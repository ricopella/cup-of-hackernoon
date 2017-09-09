const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    url: {
        type: String
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comments"
    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;