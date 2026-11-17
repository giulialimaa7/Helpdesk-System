import Sequelize from 'sequelize';
import { db } from '../database/db.js';

const Problemas = db.define("Problemas", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome: Sequelize.STRING,

}, {
    tableName: "problemas",
    timestamps: false
});

export default Problemas;