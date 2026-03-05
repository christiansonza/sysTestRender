import express from 'express'
import {getPaymentRequestDetail, getPaymentRequestDetailById, postPaymentRequestDetail,updatePaymentRequestDetail} from '../controller/paymentRequestDetailController.js'
import middleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', middleware, getPaymentRequestDetail)
router.get('/:id', middleware, getPaymentRequestDetailById)
router.post('/', middleware, postPaymentRequestDetail)
router.put('/:id', middleware, updatePaymentRequestDetail)

export default router