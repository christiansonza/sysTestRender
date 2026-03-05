import express from 'express';
import { getEmployee, getEmployeeById, createEmployee, updateEmployee } from '../controller/employeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployee);
router.get('/:id', authMiddleware, getEmployeeById);
router.post('/', authMiddleware, createEmployee);
router.put('/:id', authMiddleware, updateEmployee);

export default router;
