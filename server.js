const express = require('express'),
    colors = require("colors"),
    bodyParser = require("body-parser"),
    exphbs = require("express-handlebars"),
    mongojs = require("mongojs"),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


// app.use("/", routes);

app.listen(port, () => { console.log(`==> 🌎  Listening on PORT ${port}. Visit http://localhost:${port}`.green) });