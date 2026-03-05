import express from 'express';
import {
  getAccount,
  getAccountById,
  postAccount,
  updateAccount,
  importExcel, 
} from '../controller/accountTitlecontroller.js';

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/', getAccount);
router.get('/:id', getAccountById);
router.post('/', postAccount);
router.put('/:id', updateAccount);

router.post('/import', middleware, upload.single('file'), importExcel);

export default router;
