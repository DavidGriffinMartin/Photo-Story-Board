// REQUIRE DEPENDENCIES ------------------------
const express = require("express");
const bcrypt = require("bcrypt");
const sessionsRouter = express.Router();
const User = require("../models/user.js");

// NEW SESSION ROUTE ---------------------------
sessionsRouter.get("/new", (req, res) => {
  res.render("sessions/newSession.ejs", {
    currentUser: req.session.currentUser,
  });
});

// DELETE SESSION ROUTE ------------------------
sessionsRouter.delete("/", (req, res) => {
  req.session.destroy((error) => {
    res.redirect("/crud");
  });
});

// CREATE SESSION ROUTE ------------------------
sessionsRouter.post("/", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (error, foundUser) => {
      if (!foundUser) {
        res.send("Invalid user email.");
      } else {
        const passwordMatches = bcrypt.compareSync(
          req.body.password,
          foundUser.password
        );
        if (passwordMatches) {
          req.session.currentUser = foundUser;
          res.redirect("/crud");
        } else {
          res.send("Invalid credentials.");
        }
      }
    }
  );
});

// EXPORT SESSIONS ROUTER ----------------------
module.exports = sessionsRouter;
