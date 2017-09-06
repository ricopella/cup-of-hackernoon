const express = require("express"),
    router = express.Router(),
    request = require("request"),
    cheerio = require("cheerio");


router.get("/", (req, res) => {
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
                results.push({
                    title: title,
                    link: link,
                    desc: desc,
                    img: url
                });
            }

        });
        console.log(results);
    });
    return res.render("index");
})

module.exports = router;