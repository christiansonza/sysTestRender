import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";
import AccountTitle from '../model/accountTitleModel.js'
const subAccount = sequelize.define('subAccounts',
    {
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
        accountDept:{
            type:DataTypes.BOOLEAN
        },
        accountList:{
            type:DataTypes.BOOLEAN
        },
        accountListItem:{
            type:DataTypes.STRING
        },
        accountId:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model: AccountTitle,
                key:"id"
            }
        },
        isActive:{
            type:DataTypes.BOOLEAN
        },
        updatedById:{
            type:DataTypes.INTEGER
        }
    },
    {
        tableName: "SubAccountTitle"
    }
)

export default subAccount