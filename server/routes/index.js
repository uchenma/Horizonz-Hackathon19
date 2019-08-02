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
    isCompleted: false,
    recs: []
  });
  newGoal.save(function(err, result) {
    if (err) return res.json({ success: false, error: err, data: null });
    res.json({ success: true, error: "", data: result });
  });
});

router.post("/:goalId/newrec", function(req, res, next) {
  let goalId = req.params.goalId;
  // console.log(goalId);
  let newRec = new Rec({
    user: req.user._id,
    content: req.body.content,
    createdAt: new Date(),
    goal: goalId,
    likes: 0
  });
  // console.log("newrec", newRec);

  newRec.save(function(err, resp) {
    if (err) {
      res.json({ success: false, error: err });
    }
    if (!err) {
      Goal.findById(goalId, function(err, goal) {
        console.log(goal);
        if (err) {
          console.log(err);
        }
        if (!err) {
          goal.rec.push(newRec._id);
          goal.save(function(err2, resp2) {
            if (err2) {
              console.log("Error saving rec to goal");
            }
            if (!err2) {
              console.log("goal is saved after rec is added");
              res.json({ success: true, error: "", data: goal });
            }
          });
        }
      });
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
      res.json({ success: true, error: "" });
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

router.get("/me", function(req, res) {
  const userId = req.user._id;
  console.log(req.user);
  User.findOne({ _id: userId }, function(error, result) {
    if (error) {
      res.json({ success: false, error: "can't find user", data: null });
    }
    Goal.find({ user: userId }, function(err, goals) {
      if (err) {
        res.json({ success: false, error: "can't find goals from userid" });
      }
      if (!err) {
        res.json({ success: true, error: "", data: result, goals });
      }
    });
  });
});

router.get("/timeline", function(req, res) {
  Goal.find()
    .populate("user")
    .populate("rec")
    .exec(function(error, result) {
      if (error) {
        res.json({ success: false, error: error, data: [] });
        console.log(error);
      } else {
        res.json({ success: true, error: "", data: result });
        console.log("/timeline worked");
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

router.post("/togglegoal", function(req, res) {
  Goal.findById(req.body.goalId, function(err, goal) {
    if (err) {
      console.log("Error finding goal for toggleGoal", err);
    }
    if (!err) {
      console.log(goal);
      goal.isCompleted = !goal.isCompleted;
      goal.save(function(err2, result) {
        if (err2) {
          console.log("Error saving toggle to goal", err2);
        }
        if (!err2) {
          res.json({ success: true, error: "", data: goal });
        }
      });
    }
  });
});

module.exports = router;
