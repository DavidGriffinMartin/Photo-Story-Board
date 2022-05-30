// REQUIRE DEPENDENCIES ------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SET UP SCHEMA -------------------------------
const userSchema = Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  });
  
// LINK SCHEMA MODEL TO VARIABLE ---------------
const User = mongoose.model("User", userSchema);

// EXPORT MODEL VARIABLE -----------------------
module.exports = User;