import express from 'express';
const route = express.Router()

import { ValidateUser } from '../middleware/ValidateZod.js';
import { protect } from '../middleware/Protect.js';
import { createTransaction, deleteTransaction, getAlltrans, summartTrans, updateTransaction } from '../Controllers/Transactions.js'
import { validateTransaction } from '../Schema.js/TransactionShema.js';


route.get('/', protect, getAlltrans)

route.get('/monthly-summary', protect, summartTrans)

route.post('/', protect, ValidateUser(validateTransaction),  createTransaction)

route.put('/:id', protect, updateTransaction)

route.delete('/:id', protect, deleteTransaction)

export default route 