const express = require("express");
const router = express.Router();
const { User, Goal, Message, Rec, Score } = require("../models");
const mongoose = require("mongoose");

// router.use(function(req, res, next) {
// //   console.log("user is", req.user);
//   if (!req.user) {
//     res.json({ success: false, error: "Not logged in user" });
//   } else {
//     return next();
//   }
// });

router.post("/newgoal", function(req, res, next) {
  let userId = req.user._id;
  let newGoal = new Goal({
    user: userId,
    content: req.body.content,
    createdAt: new Date(),
    recs: []
  });
  newGoal.save(function(err, result) {
    if (err) return res.json({ success: false, error: err });
    User.find(
      { _id: userId }.exec(function(err, user) {
        if (err) return console.log(err);

        user.goals.push(newGoal._id);
      })
    );
    res.json({ success: true, error: "", data: result });
  });
});

router.post("/:goalId/newrec", function(req, res, next) {
  let goalId = req.params.goalId;
  let newRec = new Rec({
    user: req.user._id,
    content: req.body.content,
    date: new Date(),
    goal: goalId,
    likes: 0
  });

  newRec.save(function(err, res) {
    if (err) {
      res.json({ success: false, error: err });
    }
    if (!err) {
      Goal.find({ _id: goalId }, function(err, goal) {
        if (err) {
          console.log(err);
        }
        if (!err) {
          goal.recs.push(newRec._id);
        }
      });
      res.json({ success: true, error: "" });
    }
  });
});

router.post("/:recId/addLike", function(req, res) {
  let recId = req.params.recId;
  Rec.findOne({ _id: recId }, function(err, rec) {
    if (err) {
      res.json({ success: false, error: err });
    }
    if (!err) {
      rec.likes = rec.likes + 1;
      res.json({ success: true, error: "" });
    }
  });
});

router.post("/:userId/newMessage", function(req, res) {
  let recipientId = req.params.userId;
  let senderId = req.user._id;
  let newMessage = new Message({
    to: recipientId,
    from: senderId,
    sentAt: new Date(),
    content: req.body.content
  });

  newMessage.save(function(err, res) {
    if (err) {
      res.json({ success: false, error: err });
    }
    if (!err) {
      res.json({ success: true, error: err });
    }
  });
});

router.post("/:userId/score", function(req, res) {
  let user1 = req.user._id;
  let user2 = req.params.userId;

  Score.find({ user1: user1, user2: user2 }, function(err, score) {
    if (err) {
      let newScore = new Score({
        user1: req.user._id,
        user2: req.params.userId,
        score: 1
      });

      newScore.save(function(error, success) {
        if (error) {
          res.json({ success: false, error: error });
        }
        if (!error) {
          res.json({ success: true, error: "" });
        }
      });
    }
    if (!err) {
      score.score = score.score + 1;
      res.json({ success: true, error: "" });
    }
  });
});

router.get("/users/:userId", function(req, res) {
  const userId = req.params.userId;
  if (userId !== req.user._id) {
    res.json({
      success: false,
      error: "You can't view the profile of a user that's not you"
    });
  } else {
    User.findOne({ _id: userId }, function(error, result) {
      if (error) {
        res.json({ success: false, error: error, data: null });
      }
      if (!error) {
        console.log(result);
        res.json({ success: true, error: "", data: result });
      }
    });
  }
});

router.get("/timeline", function(req, res) {
  Goal.find(function(error, result) {
    if (error) {
      res.json({ success: false, error: error, data: [] });
    } else {
      res.json({ success: true, error: "", data: result });
    }
  });
});

router.get("/:userId/messages", function(req, res) {
  let loggedUserId = req.user._id;
  let userId = req.params.userId;

  Message.find({ from: loggedUserId, to: userId }, function(errOne, resultOne) {
    if (errOne) {
      console.log(errOne);
    }
    if (!errOne) {
      Message.find({ from: userId, to: loggedUserId }, function(
        errTwo,
        resultTwo
      ) {
        if (errTwo) {
          console.log(errTwo);
        }

        if (!errTwo) {
          let result = resultOne;
          result.push(resultTwo);
          result.flat();
          res.json({ success: true, error: "", data: result });
        }
      });
    }
  });
});

module.exports = router;
