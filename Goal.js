const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  Content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  Recommendations: {
    type: Array,
    required: false
  }
});

const messageSchema = new Schema({
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sentAt: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Goal = mongoose.model("Goal", goalSchema);
const Message = mongoose.model("Message", messageSchema);

module.exports({
  Goal,
  Message
});
