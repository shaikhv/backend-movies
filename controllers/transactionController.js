const Transaction = require('../models/Transaction');

exports.getAllTransactions = async (req, res) => {
  const { id } = req.user;
  try {
    console.log('Fetching transactions for userId:', id);
    const transactions = await Transaction.find({ userId: id });
    res.status(200).json({ transactions });
  } catch (error) {
    console.log('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
}

exports.createTransaction = async (req, res) => {
  const { type, amount, category, customCategory, description, paymentMethod, isRecurring, recurring } = req.body;
  try {
    const newTransaction = new Transaction({ userId: req.user.id, type, amount, category, customCategory, description, paymentMethod, isRecurring, recurring });
    await newTransaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    console.log('Error creating transaction:', error);
    res.status(500).json({ error: 'Error creating transaction' });
  }
}

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  console.log('Updating transaction with ID:', req);
  const { type, amount, category, customCategory, description, paymentMethod, isRecurring, recurring } = req.body;
  try {
    if(!id) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }
    const updatedTransaction = await Transaction.findOneAndUpdate({ _id: id, userId: req.user.id }, { $set: { type, amount, category, customCategory, description, paymentMethod, isRecurring, recurring } }, { new: true });
    return res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
  } catch (error) {
    console.log('Error updating transaction:', error);
    res.status(500).json({ error: 'Error updating transaction' });
  }
}