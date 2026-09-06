const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    important: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Shopping', 'Learning'],
      default: 'Personal'
    },
    dueDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index category and completed fields for query performance
todoSchema.index({ category: 1, completed: 1 });

module.exports = mongoose.model('Todo', todoSchema);
