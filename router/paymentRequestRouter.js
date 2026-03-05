import express from 'express'
import {getPaymentRequest, getPaymentRequestById, postPaymentRequest, updatePaymentRequest} from '../controller/paymentRequestController.js'
import middleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', middleware, getPaymentRequest)
router.get('/:id', middleware, getPaymentRequestById)
router.post('/', middleware, postPaymentRequest)
router.put('/:id',middleware, updatePaymentRequest)

export default router