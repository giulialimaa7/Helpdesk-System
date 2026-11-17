import Sequelize from 'sequelize';
import { db } from '../database/db.js';

const Chamados = db.define("Chamados", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    //ADM
    protocolo: Sequelize.STRING,
    abertura: Sequelize.DATE,
    prioridade: Sequelize.STRING,
    status: Sequelize.STRING,

    //USER
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    celular: Sequelize.STRING,
    anydesk: Sequelize.STRING,
    n_patrimonio: Sequelize.STRING,
    estado: Sequelize.STRING,
    setor: Sequelize.STRING,
    problema: Sequelize.STRING,
    descricao: Sequelize.STRING,
    
    responsavel: Sequelize.STRING,
    justificativa_em_andamento: Sequelize.STRING,
    justificativa_fechado: Sequelize.STRING,
    fechamento: Sequelize.DATE,

}, {
    tableName: "chamados",
    timestamps: false
});

export default Chamados;