# Cup of Hacker Noon &middot; [![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/) &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A news scraping site pulling the freshest brewed stories from [Hacker Noon](https://hackernoon.com/latest). Viewers are able to like & comment on each article.

This Full-Stack application was built with a Front-End implented with HTML/CSS and templating from Handlebars framework and bootstrap for a responsive design. The Back-End consists of Node.js, Express, Cheerio for web scraping, and **MongoDB & Mongoose** for the database and ODM.

## Installation

1. `git clone https://github.com/ricopella/cup-of-hackernoon` the repository to your local computer
2. `git bash` into the directory created by the clone
3. Run `npm install`
5. Update connection string to reflect credentials for your mongoDB instance

#### Dependencies

List of required dependencies which can be gathered by `npm install` once repository is cloned

```
{
  "dependencies": {
    "body-parser": "^1.17.2",
    "cheerio": "^1.0.0-rc.2",
    "colors": "^1.1.2",
    "express": "^4.15.4",
    "express-handlebars": "^3.0.0",
    "mongoose": "^4.11.10",
    "morgan": "^1.8.2",
    "request": "^2.81.0"
    }
}
```

#### Directory Structure

```
.
├── controllers
│   └── cupof_controller.js
│
├── models
│   ├── Article.js
│   └── Comments.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── normalize.css
│       │   └── styles.css
│       │   └── reset.css
│       ├── images
│       │   └── bgimg.png
│       │   └── cupof1.png
│       └── js
│           └── moment.js
│           └── app.js
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```

# Packages Used

* [Node.JS](https://www.npmjs.com/)
* [Cheerio](https://www.npmjs.com/package/cheerio)
* [MongoDB](https://www.npmjs.com/package/mongodb)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [Express](https://www.npmjs.com/package/express)
* [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)
* [Morgan](https://www.npmjs.com/package/morgan)
* [Request](https://www.npmjs.com/package/request)
* [Heroku](https://www.npmjs.com/package/heroku)

# History

Created on 9/09/17
