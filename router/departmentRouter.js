import express from 'express'
import {getDepartment, postDepartment,getDepartmentById,updateDepartment} from '../controller/departmentController.js'
import middleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/',middleware, getDepartment)
router.get('/:id',middleware, getDepartmentById)
router.post('/',middleware, postDepartment)
router.put('/:id',middleware, updateDepartment);

export default router