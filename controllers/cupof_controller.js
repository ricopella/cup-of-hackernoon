const express = require("express"),
    router = express.Router(),
    request = require("request"),
    cheerio = require("cheerio"),
    Article = require("../models/Article"),
    Comments = require("../models/Comments"),
    mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cupof");

const db = mongoose.connection;

db.on("error", error => console.log("Database Error:", error));

db.once("open", () => console.log("Mongoose connection successful."));

// index route
router.get("/", (req, res) => res.render("index"));

// retrieve all articles
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
    request("https://hackernoon.com/", (error, response, html) => {

        let $ = cheerio.load(html);

        $(".postItem").each((i, element) => {

            let result = {};

            result.link = $(element).children().attr("href");
            result.title = $(element).children().text();

            // small hack to remove the title from the description
            let desc = $(element).siblings().text();
            result.desc = desc.replace(result.title, "");

            // small hack to remove the link from html element
            let img = $(element).children().attr("style");
            let newArray = img.split(" ");
            let newnew = newArray[1].split('"');
            result.url = newnew[1];

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
        .populate("comments")
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
    console.log(newComment);

    newComment.save(function(err, doc) {

        if (err) {
            console.log(err);
        }
        // Otherwise
        else {
            // Use the article id to find and update it's note
            Article.findOneAndUpdate({ "_id": req.params.id }, { "comments": doc._id })
                // Execute the above query
                .exec((err, doc) => {
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

module.exports = router;