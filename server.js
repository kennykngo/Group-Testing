// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Enables the use of .env files
require("dotenv").config();

// // Configure express input / output
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client"));

// We need to use sessions to keep track of our user's login status
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// Initializes passport
app.use(passport.initialize());
app.use(passport.session());

// Brings in my routes
const logRoutes = require("./routes/log-routes.js");
const apiRoutes = require("./routes/api-routes.js");
const clientRoutes = require("./routes/client-routes.js");
const profileRoutes = require("./routes/profile-routes.js");

// use routes
app.use(clientRoutes, apiRoutes, logRoutes, profileRoutes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});


