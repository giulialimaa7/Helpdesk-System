import Sequelize from 'sequelize';
import { db } from '../database/db.js';

const User = db.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    permissao: Sequelize.STRING,

}, {
    tableName: "users",
    timestamps: false
});

export default User;