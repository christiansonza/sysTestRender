import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";

const User =  sequelize.define('User',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
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
        isActive:{
            type:DataTypes.BOOLEAN,
        },
        updatedById:{
            type:DataTypes.INTEGER,
        }
    },
    {
        tableName:'User',
    }
)

export default User