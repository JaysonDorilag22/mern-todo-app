const mongoose = require('mongoose');
const moment = require('moment');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    validate: {
      validator: function(v) {
        return this.documents.length > 0 || this.images.length > 0 || v;
      },
      message: 'Title is required if no documents or images are uploaded.'
    }
  },
  description: {
    type: String,
    validate: {
      validator: function(v) {
        return this.documents.length > 0 || this.images.length > 0 || v;
      },
      message: 'Description is required if no documents or images are uploaded.'
    }
  },
  completed: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(v) {
        return this.documents.length > 0 || this.images.length > 0 || v;
      },
      message: 'Due date is required if no documents or images are uploaded.'
    },
    default: () => moment().add(3, 'days').toDate(),
  },
  status: {
    type: String,
    enum: ['Late', 'Due Today', 'Due Tomorrow', 'On Time', 'Submitted', 'Needs Revision', 'Completed', 'Minor Revision', 'Big Revision'],
    default: 'On Time',
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    validate: {
      validator: function(v) {
        return v === null || mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid ObjectId!`
    },
    default: null,
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: function(v) {
        return v === null || mongoose.Types.ObjectId.isValid(v);
      },
      message: props => `${props.value} is not a valid ObjectId!`
    },
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  documents: [{
    name: String,
    url: String
  }],
  images: [{
    url: {
      type: String,
      required: false,
    },
    publicId: {
      type: String,
      required: false,
    }
  }],
  note: {
    type: String,
    default: '',
  },
  submitted: {
    type: Boolean,
    default: false,
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;