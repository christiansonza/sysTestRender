import express from 'express';
import { getCompany, getCompanyById, createCompany, updateCompany } from '../controller/companyController.js';
import authMiddleware from '../middleware/authMiddleware.js'
const router = express.Router();

router.get('/', authMiddleware, getCompany);
router.get('/:id', authMiddleware, getCompanyById);
router.post('/', authMiddleware, createCompany); 
router.put('/:id',authMiddleware, updateCompany); 

export default router;
