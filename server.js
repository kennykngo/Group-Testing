const express = require("express");
const session = require("express-session");
const passport = require("passport");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;

// Enables the use of .env files
require("dotenv").config();

// // Configure express input / output
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./client"));

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

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
});


