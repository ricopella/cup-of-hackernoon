const express = require("express"),
    router = express.Router(),
    request = require("request"),
    cheerio = require("cheerio"),
    mongojs = require("mongojs"),
    Article = require("../models/Article"),
    Comments = require("../models/Comments"),
    mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/cupof");

const db = mongoose.connection;

db.on("error", function(error) {
    console.log("Database Error:", error);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

router.get("/", (req, res) => {

    res.render("index")

});


router.get("/all", (req, res) => {

    Article.find({}, (error, doc) => {
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
})


router.get("/add", (req, res) => {
    request("https://hackernoon.com/", (error, response, html) => {

        let $ = cheerio.load(html);



        $(".postItem").each((i, element) => {

            let result = {};

            result.link = $(element).children().attr("href");
            result.title = $(element).children().text();
            result.desc = $(element).siblings().text();

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

module.exports = router;