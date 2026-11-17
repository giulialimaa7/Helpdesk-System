import Sequelize from 'sequelize';
import { db } from '../database/db.js';

const Setores = db.define("Setores", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: Sequelize.STRING,

}, {
    tableName: "setores",
    timestamps: false
});

export default Setores;