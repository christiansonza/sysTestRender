import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";


const accountTitle = sequelize.define('accountTitle',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        code:{
            type:DataTypes.STRING
        },
        name:{
            type:DataTypes.STRING
        },
        accountType:{
            type:DataTypes.STRING
        },
        reportType:{
            type:DataTypes.STRING
        },
        lineItem:{
            type:DataTypes.STRING
        },
        isActive:{
            type:DataTypes.BOOLEAN
        },
        updatedById:{
            type:DataTypes.INTEGER
        }
    },
    {
        tableName: "AccountTitle"
    }
)

export default accountTitle