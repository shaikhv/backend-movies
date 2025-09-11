const express = require('express');
const { createTransaction, updateTransaction, getAllTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', getAllTransactions);
router.post('/create', createTransaction);
router.post('/update/:id', updateTransaction);

module.exports = router;