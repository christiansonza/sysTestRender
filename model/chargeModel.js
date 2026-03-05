import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";

const Charge = sequelize.define('Charge',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        code:{
            type:DataTypes.STRING
        },
        name:{
            type:DataTypes.STRING
        },
        isActive:{
            type:DataTypes.BOOLEAN
        }
    },
    {
        tableName: "Charge"
    }
)

export default Charge