import {DataTypes} from 'sequelize'
import { sequelize } from '../config/conn.js'
import PaymentRequest from './paymentRequestModel.js' 
import Booking from './bookingModel.js'
import Charge from './chargeModel.js'

const paymentRequestDetail = sequelize.define('PaymentRequestDetail',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        paymentRequestId:{
            type:DataTypes.INTEGER,
            references:{
                model: PaymentRequest,
                key:'id'
            }
        },
        bookingId:{
            type:DataTypes.INTEGER,
            references:{
                model: Booking,
                key: 'id'
            }
        },
        chargeId:{
            type:DataTypes.INTEGER,
            references:{
                model: Charge,
                key: 'id'
            },
        },
        chargeDesc:{
            type:DataTypes.STRING
        },
        quantity:{
            type:DataTypes.DOUBLE
        },
        amount:{
            type:DataTypes.DOUBLE
        }
    },
    {
        tableName: "PaymentRequestDetail"
    }
)

export default paymentRequestDetail