const express = require("express"),
    router = express.Router(),
    request = require("request"),
    cheerio = require("cheerio"),
    mongojs = require("mongojs"),
    db = mongojs("cupof", ["scrapedData"]);

router.get("/", (req, res) => {

    res.render("index")

});


router.get("/all", (req, res) => {

    db.scrapedData.find({}, (error, found) => {
        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    });

})


router.get("/add", (req, res) => {
    request("https://hackernoon.com/", (error, response, html) => {

        let $ = cheerio.load(html);

        let results = [];

        $(".postItem").each((i, element) => {

            let link = $(element).children().attr("href");
            let img = $(element).children().attr("style");
            let title = $(element).children().text();
            let desc = $(element).siblings().text();

            let newArray = img.split(" ");
            let newnew = newArray[1].split('"');
            let url = newnew[1];

            if (link !== undefined && title !== undefined) {
                db.scrapedData.insert({
                    title: title,
                    link: link,
                    desc: desc,
                    img: url
                });
            }
        });
        // res.send("Data was scraped!") 
    });
    // return res.render("index");
})

module.exports = router;