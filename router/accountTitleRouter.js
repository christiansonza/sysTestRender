import express from 'express';
import {
  getAccount,
  getAccountById,
  postAccount,
  updateAccount,
  importExcel, 
} from '../controller/accountTitlecontroller.js';
import middleware from '../middleware/authMiddleware.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', middleware, getAccount);
router.get('/:id', middleware, getAccountById);
router.post('/', middleware, postAccount);
router.put('/:id', middleware, updateAccount);

router.post('/import', middleware, upload.single('file'), importExcel);

export default router;
