// REQUIRE DEPENDENCIES ------------------------
const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const User = require("../models/user.js");

// NEW USER ROUTE ------------------------------
userRouter.get("/new", (req, res) => {
  res.render("users/newUser.ejs", {
    currentUser: req.session.currentUser,
  });
});

// CREATE USER ROUTE ---------------------------
userRouter.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (error, createdUser) => {
    res.redirect("/");
  });
});

// EXPORT USER ROUTER --------------------------
module.exports = userRouter;
