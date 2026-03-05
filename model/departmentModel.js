import {DataTypes} from 'sequelize'
import { sequelize } from '../config/conn.js'

const department = sequelize.define('Department',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        code:{
            type:DataTypes.STRING,
        },
        name:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING
        },
        isActive:{
            type:DataTypes.STRING
        }
    },
    {
        tableName: "Department"
    }
)

export default department