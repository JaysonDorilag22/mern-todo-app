const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;