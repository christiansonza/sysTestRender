import { DataTypes } from "sequelize";
import { sequelize } from "../config/conn.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bookingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.INTEGER, 
    },
    remarks: {
      type: DataTypes.STRING,
    },
    updatedById: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Booking",
  }
);

export default Booking;
