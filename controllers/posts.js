// REQUIRE DEPENDENCIES ------------------------
const express = require("express");
const bcrypt = require("bcrypt");
const postsRouter = express.Router();
const User = require("../models/user.js");

// INDEX ROUTE ---------------------------------
postsRouter.get("/", (req, res) => {
  if (req.session.currentUser) {
    res.render("dashboard.ejs", {
      currentUser: req.session.currentUser,
    });
  } else {
    res.render("index.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

// NEW ROUTE -----------------------------------


// DELETE ROUTE --------------------------------


// UPDATE ROUTE --------------------------------


// CREATE ROUTE --------------------------------


// EDIT ROUTE ----------------------------------


// SHOW ROUTE ----------------------------------


// EXPORT USER ROUTER --------------------------
module.exports = postsRouter;