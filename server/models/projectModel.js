const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
  }],
  image: {
    url: {
      type: String,
      required: false,
    },
    publicId: {
      type: String,
      required: false,
    },
  },
  invitedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  referralCode: {
    type: String,
    required: true,
    unique: true,
  },
  isAcceptingUsers: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;