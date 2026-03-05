import express from 'express';
import multer from 'multer';
import middleware from '../middleware/authMiddleware.js';
import {
  getSubAccount,
  getSubAccountById,
  postSubAccount,
  updateSubAccount,
  importExcel,
} from '../controller/subAccountTitleController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', middleware, getSubAccount);
router.get('/:id', middleware, getSubAccountById);
router.post('/', middleware, postSubAccount);
router.put('/:id', middleware, updateSubAccount);

router.post('/import', middleware, upload.single('file'), importExcel);

export default router;
