import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";

const Company = sequelize.define('Company',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        code:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING
        },
        tin:{
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
        tableName:'Company'
    }
)

export default Company