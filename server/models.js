const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: "https://horizons-static.s3.amazonaws.com/horizons_h.png"
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
});

const RecSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  likes: Number,
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    required: true
  }
});

const ScoreSchema = new Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number
});

const goalSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
  isCompleted: Boolean,
  rec: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rec"
    }
  ]
});

const messageSchema = new Schema({
  to: {
    type: String
    // ref: "User"
  },
  from: {
    type: String
    // ref: "User"
  },
  sentAt: {
    type: Date,
    required: false
  },
  content: {
    type: String,
    required: true
  }
});

const Goal = mongoose.model("Goal", goalSchema);
const Message = mongoose.model("Message", messageSchema);
const User = mongoose.model("User", userSchema);
const Rec = mongoose.model("Rec", RecSchema);
const Score = mongoose.model("Score", ScoreSchema);

module.exports = {
  Goal,
  Message,
  User,
  Rec,
  Score
};
