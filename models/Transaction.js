const mongoose = require('mongoose');

const recurringSchema = new mongoose.Schema({
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: true,
    },
    nextOccurrence: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    }
  }, { _id: false }); // prevent nested _id

const transactionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    customCategory: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: '',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash', 'Card', 'Bank Transfer', 'UPI', 'Other'],
      default: 'Other',
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurring: {
      type: recurringSchema,
      default: null,
    }
  }, {
    timestamps: true // adds createdAt and updatedAt
  });

module.exports = mongoose.model('Transaction', transactionSchema);