import {DataTypes, STRING} from 'sequelize'
import { sequelize } from '../config/conn.js'
import Vendor from '../model/vendorModel.js'
import Department from '../model/departmentModel.js'

const paymentRequest = sequelize.define('PaymentRequest',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        vendorId:{
            type:DataTypes.INTEGER,
            references:{
                model: Vendor,
                key:'id'
            }
        },
        dateNeeded:{
            type:DataTypes.DATE
        },
        costCenterId:{
            type:DataTypes.INTEGER,
            references:{
                model:Department,
                key:'id'
            }
        },
        requestType:{
            type:DataTypes.STRING
        },
        requestNumber:{
            type:DataTypes.STRING
        },
        chargeTo:{
            type:DataTypes.STRING
        },
        remarks:{
            type:DataTypes.STRING
        }
    },
    {
        tableName: "PaymentRequest"
    }
)

export default paymentRequest