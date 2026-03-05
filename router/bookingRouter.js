import express from 'express';
import {
  getBooking,
  getBookingById,
  createBooking,
  updateBooking
} from '../controller/bookingController.js';
import middleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', middleware, getBooking);
router.get('/:id', middleware, getBookingById);
router.post('/', middleware, createBooking);
router.put('/:id', middleware, updateBooking);

export default router;
