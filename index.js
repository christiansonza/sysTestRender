import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {sequelize, dbConnect} from './config/conn.js'
import cookieParser from 'cookie-parser'

//routers
import userRouter from './router/userRouter.js'
import companyRouter from './router/companyRouter.js'
import employeeRouter from './router/employeeRouter.js'
import customerRouter from './router/customerRouter.js'
import vendorRouter from './router/vendorRouter.js'
import bookingRouter from './router/bookingRouter.js'
import accountTitleRouter from './router/accountTitleRouter.js'
import subAccountTitleRouter from './router/subAccountTitleRouter.js'
import departmentRouter from './router/departmentRouter.js'
import paymentRequestRouter from './router/paymentRequestRouter.js'
import paymentRequestDetailRouter from './router/paymentRequestDetailRouter.js'
import chargeRouter from './router/chargeRouter.js'

//models
import './model/userModel.js'
import './model/companyModel.js'
import './model/employeeModel.js'
import './model/customerModel.js'
import './model/vendorModel.js'
import './model/bookingModel.js'
import './model/departmentModel.js'
import './model/paymentRequestModel.js'
import './model/paymentRequestDetailModel.js'
import './model/chargeModel.js'
import './model/index.js'


const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cookieParser())
app.use(cors({
    origin: 'https://sys-test-vercel-ruvo.vercel.app', 
    methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
    credentials: true,
}));

//ROUTES
app.use('/users',userRouter)
app.use('/company',companyRouter)
app.use('/employee',employeeRouter)
app.use('/customer',customerRouter)
app.use('/vendor',vendorRouter)
app.use('/booking',bookingRouter)
app.use('/account',accountTitleRouter)
app.use('/subAccount',subAccountTitleRouter)
app.use('/department',departmentRouter)
app.use('/paymentRequest',paymentRequestRouter)
app.use('/paymentRequestDetail',paymentRequestDetailRouter)
app.use('/charge',chargeRouter)


//CONNECTION
const startServer = async()=>{
    try {
        await dbConnect()
        await sequelize.sync({alter:true})
        app.listen(PORT)
    } catch (error) {
        console.log(error)
    }
}

startServer()
