const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models");
const routes = require("./routes/index");
const auth = require("./routes/auth");
const crypto = require("crypto");
const MongoStore = require("connect-mongo")(session);

const REQUIRED_ENVS = ["MONGODB_URI"];

REQUIRED_ENVS.forEach(function(el) {
  if (!process.env[el]) throw new Error("Missing required env var " + el);
});
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => console.log(`Connected to MongoDB!`));

app.get("/", (req, res) => {
  res.send("hello");
});

// static
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport stuff

app.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // name: "Doggos",
    // proxy: true,
    resave: true,
    saveUninitialized: true
  })
);
// function to turn password into hashed password
function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

// Passport Serialize
passport.serializeUser(function(user, done) {
  console.log("Hi i'm in serialize", user);
  done(null, user._id);
});

// Passport Deserialize
passport.deserializeUser(function(id, done) {
  console.log("Hi i'm in deserialize", id);
  User.findById(id, function(err, user) {
    console.log(user);
    done(err, user);
  });
});

// Initialize Passport[]
passport.use(
  new LocalStrategy(function(email, password, done) {
    const hashedPassword = hashPassword(password);
    User.findOne({ email: email }, function(err, user) {
      console.log(user);
      if (err) {
        console.log("Incorrect Email");
        done(err);
      } else if (user && user.password === hashedPassword) {
        console.log("User found!");
        done(null, user);
      } else {
        console.log("Incorrect Password");
        done(null, false);
      }
    });
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(auth(passport, hashPassword));
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

module.exports = app;
