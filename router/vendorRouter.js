import express from 'express';
import {
  getVendor,
  getVendorById,
  createVendor,
  updateVendor,
} from '../controller/vendorController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getVendor);
router.get('/:id', authMiddleware, getVendorById);
router.post('/', authMiddleware, createVendor);
router.put('/:id', authMiddleware, updateVendor);

export default router;
