const express = require('express'),
    colors = require("colors"),
    bodyParser = require("body-parser"),
    exphbs = require("express-handlebars"),
    routes = require("./controllers/cupof_controller.js"),
    mongojs = require("mongojs"),
    db = mongojs("cupof", ["scrapedData"]),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.on("error", function(error) {
    console.log("Database Error:", error);
});


app.use("/", routes);

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
    // console.error(err.stack).red
});


app.listen(port, () => { console.log(`==> 🌎  Listening on PORT ${port}. Visit http://localhost:${port}`.green) });