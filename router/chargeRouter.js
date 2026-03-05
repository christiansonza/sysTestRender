import express from 'express'
import {getCharge, getChargeById, postCharge, updateCharge} from '../controller/chargeController.js'
import middleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', middleware, getCharge)
router.get('/:id', middleware, getChargeById)
router.post('/', middleware, postCharge)
router.put('/:id', middleware, updateCharge)

export default router