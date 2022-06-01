// REQUIRE DEPENDENCIES ------------------------
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();

// REQUIRE ROUTER DEPENDENCIES -----------------
const postsController = require("./controllers/posts");
const userController = require("./controllers/users");
const sessionsController = require("./controllers/sessions");

// INITIALIZE EXPRESS APPLICATION --------------
const app = express();

// CONNECT MONGO TO ATLAS ----------------------
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MOUNT MIDDLEWARE ----------------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/crud", postsController);
app.use("/users", userController);
app.use("/sessions", sessionsController);

// TEST ROUTE ---------------------------------
app.get("/test", (req, res) => {
  if (req.session.currentUser) {
    res.render("test.ejs", {
      currentUser: req.session.currentUser,
    });
  } else {
    res.render("sessions/newSession.ejs", {
      currentUser: req.session.currentUser,
    });
  }
});

// CHECK DATABASE CONNECTION -------------------
const db = mongoose.connection;

db.on("error", (err) =>
  console.log(err.message + " MongoDB has recieved an error.")
);
db.on("connected", () => console.log("MongoDB is connected."));
db.on("disconnected", () => console.log("MongoDB has disconnected."));

// CONFIGURE APPLICATION SETTINGS---------------
const PORT = process.env.PORT;

// DIRECT APPLICATION FOCUS --------------------
app.listen(PORT, () => {
  console.log(`Server listening @ port: ${PORT}`);
});
