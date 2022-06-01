// REQUIRE DEPENDENCIES ------------------------
const express = require("express");
const postsRouter = express.Router();
const Post = require("../models/post");

// INDEX ROUTE ---------------------------------
postsRouter.get("/", (req, res) => {
  if (req.session.currentUser) {
    Post.find({}, (error, allPosts) => {
      res.render("crud/dashboard.ejs", {
        posts: allPosts,
        currentUser: req.session.currentUser,
      })
    })
  } else {
    res.render("index.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

// NEW ROUTE -----------------------------------
postsRouter.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("crud/new.ejs", {
      currentUser: req.session.currentUser,
    });
  } else {
    res.render("sessions/newSession.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

// DELETE ROUTE --------------------------------
postsRouter.delete("/:id", (req, res) => {
	Post.findByIdAndDelete(req.params.id, (error, deletedPost) => {
		res.redirect("/crud");
	});
});

// UPDATE ROUTE --------------------------------
postsRouter.put("/:id", (req, res) => {
	Post.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(error, updatedPost) => {
			res.redirect(`/crud/${req.params.id}`)
		}
	);
});

// CREATE ROUTE --------------------------------
postsRouter.post("/", (req, res) => {
	Post.create(req.body, (error, createdPost) => {
        res.redirect("/crud");
	});
});

// EDIT ROUTE ----------------------------------
postsRouter.get("/:id/edit", (req, res) => {
  if (req.session.currentUser) {
    Post.findById(req.params.id, (error, foundPost) => {
      res.render("crud/edit.ejs", {
        post: foundPost,
        currentUser: req.session.currentUser,
      });
    });
  } else {
    res.render("sessions/newSession.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

// SHOW ROUTE ----------------------------------
postsRouter.get("/:id", (req, res) => {
  if (req.session.currentUser) {
    Post.findById(req.params.id, (error, foundPost) => {
      res.render("crud/show.ejs", {
        post: foundPost,
        currentUser: req.session.currentUser,
      });
    });
  } else {
    res.render("sessions/newSession.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

// EXPORT USER ROUTER --------------------------
module.exports = postsRouter;
