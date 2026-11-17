import Sequelize from 'sequelize';
import { db } from '../database/db.js';

const ResetToken = db.define("ResetToken", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  userId: Sequelize.INTEGER,
  token: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  
}, {
  tableName: "reset_token",
  timestamps: false
});

export default ResetToken;