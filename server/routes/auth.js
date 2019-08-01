const express = require("express");
const router = express.Router();
const { User } = require("../models");

module.exports = function(passport, hash) {
  router.post("/signup", (req, res) => {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash(req.body.password),
      profiePic: req.body.profilePic,
      age: req.body.age,
      gender: req.body.gender,
      bio: req.body.bio,
      goals: req.body.goals,
      messages: req.body.messages
    });
    newUser.save(function(err, result) {
      if (err) {
        res.json({ success: false, error: "Unable to save the user" });
      } else {
        res.json({ success: true, error: "" });
      }
    });
  });

  router.post("/login", passport.authenticate("local"), function(req, res) {
    res.json({
      success: true,
      message: "user is authenticated and logged in"
    });
  });

  // GET Logout page
  router.get("/logout", function(req, res) {
    req.logout();
    res.json({
      success: true,
      message: "user is logged out"
    });
  });

  return router;
};
