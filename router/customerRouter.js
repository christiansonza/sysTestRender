import express from 'express';
import { getCustomer, getCustomerById, createCustomer, updateCustomer } from '../controller/customerController.js';
import middleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', middleware, getCustomer);
router.get('/:id', middleware, getCustomerById);
router.post('/', middleware, createCustomer);
router.put('/:id', middleware, updateCustomer); 

export default router;
