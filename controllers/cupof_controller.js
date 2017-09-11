const express = require("express"),
    router = express.Router(),
    request = require("request"),
    cheerio = require("cheerio"),
    Article = require("../models/Article"),
    Comments = require("../models/Comments"),
    mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect("mongodb://heroku_qdvcm8fx:5or28ocvkangodi5mjgkiarhu7@ds129434.mlab.com:29434/heroku_qdvcm8fxf");

const db = mongoose.connection;

db.on("error", error => console.log("Database Error:", error));

db.once("open", () => console.log("Mongoose connection successful."));

// index route
router.get("/", (req, res) => res.render("index"));

// retrieve all articles on load of home page
router.get("/articles", (req, res) => {
    Article.find({}, (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
})

// scrape articles
router.get("/add", (req, res) => {
    request("https://hackernoon.com/latest", (error, response, html) => {

        let $ = cheerio.load(html);

        $(".postArticle-content").each(function(i, element) {

            let result = {};

            result.link = $(this).children("a").attr("href");
            result.title = $(this).children("a").children("section").children(".section-content").children(".section-inner").children("h3").text();
            result.desc = $(this).children("a").children("section").children(".section-content").children(".section-inner").children("h4").text();
            result.descp = $(this).children("a").children("section").children(".section-content").children(".section-inner").children("p").text();

            let entry = new Article(result);

            entry.save((err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(doc);
                }
            })
        });
    });
    res.send("Scrape Complete");
})

// retrieve single article by id
router.get("/articles/:id", (req, res) => {

    Article.findOne({ "_id": req.params.id })
        // .populate("comments")
        .exec((error, doc) => {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        })
})

// retrieve comments
router.get("/articles/:id/:comment", (req, res) => {
    Comments.findOne({ "_id": req.params.comment })
        .exec((error, doc) => {
            if (error) {
                console.log(error);
            } else {
                res.json(doc);
            }
        })
})

// Create new comment
router.post("/articles/:id", (req, res) => {

    let newComment = new Comments(req.body);
    // console.log(newComment);
    newComment.save(function(err, doc) {

        if (err) {
            console.log(err);
        }
        // Otherwise
        else {
            // Use the article id to find and update it's note
            Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { "comments": doc._id } }, { new: true })

            .exec(function(err, doc) {
                // Log any errors
                if (err) {
                    console.log(err);
                } else {
                    // Or send the document to the browser
                    res.send(doc);
                }
            });
        }
    })
})

// Update Likes
router.post("/articles/:id/like", (req, res) => {

    Article.findOneAndUpdate({ "_id": req.params.id }, { "like": req.body.likes })

    .exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
})

router.post("/articles/:id/like", (req, res) => {

    Article.findOneAndUpdate({ "_id": req.params.id }, { "like": req.body.likes })

    .exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
})

// delete comment
router.delete("/articles/:articleId/:commentId", (req, res) => {
    Comments.remove({
            "_id": req.params.commentId
        })
        .exec(function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.send(doc);
            }
        })
})


module.exports = router;