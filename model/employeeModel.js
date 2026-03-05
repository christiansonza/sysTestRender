import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";

const Employee =  sequelize.define('Employee',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        middleName:{
            type:DataTypes.STRING,
        },
        lastName:{
            type:DataTypes.STRING,
        },
        contactNumber:{
            type:DataTypes.STRING,
            allowNull:false
        },
        isActive:{
            type:DataTypes.BOOLEAN,
        },
        userId:{
            type:DataTypes.INTEGER,
        },
        updatedById:{
            type:DataTypes.INTEGER,
        }
    },
    {
        tableName:'Employee',
    }
)

export default Employee