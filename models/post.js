// REQUIRE DEPENDENCIES ------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SET UP SCHEMA -------------------------------
const postSchema = Schema({
  image: { type: String, required: true},
  title: { type: String },
  body: { type: String },
});

// LINK SCHEMA MODEL TO VARIABLE ---------------
const Post = mongoose.model("Post", postSchema);

// EXPORT MODEL VARIABLE -----------------------
module.exports = Post;