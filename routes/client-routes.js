const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", (req, res) =>
  !req.user
    ? res.sendFile(path.join(__dirname, "../client/index.html"))
    : res.redirect("/collection")
);

router.get("/collection", (req, res) =>
  !req.user
    ? res.redirect("/")
    : res.sendFile(path.join(__dirname, "../client/collection.html"))
);

module.exports = router;