import Sequelize from 'sequelize';
import { db } from '../database/db.js';

const Estados = db.define("Estados", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: Sequelize.STRING,

}, {
    tableName: "estados",
    timestamps: false
});

export default Estados;