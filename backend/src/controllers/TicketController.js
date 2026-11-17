import Chamados from '../models/called.js';
import Validator from '../utils/Validator.js';
import DateUtils from '../utils/DateUtils.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ProtocoloService from '../services/ProtocoloService.js';
import TokenService from '../services/TokenService.js';

export default class UserCalledController {
  //USUÁRIO TI
  //ABRIR CHAMADO
  static async openTicket(req, res) {
    try {
      const priorityMap = {
        "Problemas de Hardware": "ALTA",
        "Problemas de Software": "MÉDIA",
        "Problemas de Rede e Conectividade": "ALTA",
        "Problemas com Email e Comunicação": "BAIXA",
        "Problemas de Acesso e Segurança": "ALTA",
        "Solicitações Gerais": "BAIXA",
      };

      const requiredFields = [
        "nome",
        "email",
        "anydesk",
        "n_patrimonio",
        "estado",
        "setor",
        "problema",
        "descricao"
      ];

      Validator.validateFields(req.body, requiredFields);

      const {
        nome,
        email,
        celular,
        anydesk,
        n_patrimonio,
        estado,
        setor,
        problema,
        descricao
      } = req.body; 

      const chamado = await Chamados.create({
        //dados do sistema
        protocolo: await ProtocoloService.generateProtocol(Chamados),
        prioridade: priorityMap[problema] || "BAIXA",
        abertura: DateUtils.formatDateTime(),
        status: "ABERTO",

        //dados do usuário
        nome,
        email,
        celular,
        anydesk,
        n_patrimonio,
        estado,
        setor,
        problema,
        descricao,

        //dados do atendimento
        responsavel: "N/A",
        justificativa_em_andamento: "N/A",
        justificativa_fechado: "N/A",
        fechamento: null
      });

      return res.json({
        protocolo: chamado.protocolo,
        status: chamado.status,

        message: "Chamado registrado com sucesso!"
      });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao registrar chamado!");
    }
  }

  //CONSULTAR CHAMADOS ABERTOS PELO USUÁRIO LOGADO
  static async getUserTickets(req, res) {
    try {
      const user = await TokenService.findUserByToken(req);

      const chamados = await Chamados.findAll({
        where: {
          email: user.email,
          status: ["ABERTO", "EM ANDAMENTO"] 
        }
      });

      if (chamados.length === 0) {
        throw new Error("Nenhum chamado aberto encontrado para este usuário!");
      }

      return res.json({ chamados });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao consultar seus chamados!");
    }
  }

  //CONSULTAR CHAMADOS FECHADO DO USUÁRIO LOGADO
  static async getUserClosedTickets(req, res) {
    try {
      const user = await TokenService.findUserByToken(req);

      const chamados = await Chamados.findAll({
        where: {
          email: user.email,
          status: ["FECHADO"]
        }
      });

      if (chamados.length === 0) {
        throw new Error("Nenhum chamado fechado encontrado para este usuário!");
      }

      return res.json({ chamados });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao consultar seus chamados fechados!");
    }
  }

  //ADM TI
  //CONSULTAR CHAMADOS ABERTOS E EM ANDAMENTO
  static async getTickets(req, res) {
    try {
      const chamados = await Chamados.findAll({
        attributes: [
          //dados do sistema
          "protocolo",
          "prioridade",
          "abertura",
          "status",

          //dados do usuário
          "nome",
          "email",
          "celular",
          "anydesk",
          "n_patrimonio",
          "estado",
          "setor",
          "problema",
          "descricao",
          
          //dados do atendimento
          "responsavel",
          "justificativa_em_andamento"
        ],

        where: { status: ["EM ANDAMENTO", "ABERTO"] },
        //ordena do mais recente ao mais antigo
        order: [["abertura", "DESC"]]
      });

      return res.json({ chamados });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao consultar chamados!");
    }
  }

  //ATUALIZAR STATUS DO CHAMADO
  static async updateStatusTicket(req, res) {
    try {
      const user = await TokenService.findUserByToken(req);
      const { protocolo, status, justificativa } = req.body;

      if (!justificativa?.trim()) {
        throw new Error("A justificativa é obrigatória para atualizar o status!");
      }

      const chamado = await Chamados.findOne({ where: { protocolo } });

      if (!chamado) {
        throw new Error("Chamado não encontrado!");
      }

      //atualizar para "EM ANDAMENTO"
      if (status === "EM ANDAMENTO") {
        await Chamados.update({
          status,
          responsavel: user.name,
          justificativa_em_andamento: justificativa,

          justificativa_fechado: "N/A",
          fechamento: null

        }, { where: { protocolo } });

      }

      //atualizar para "FECHADO"
      else if (status === "FECHADO") {
        if (chamado.status === "ABERTO") {

          //fechamento direto
          await Chamados.update({
            status,
            responsavel: user.name,
            justificativa_em_andamento: "N/A",

            justificativa_fechado: justificativa,
            fechamento: DateUtils.formatDateTime()

          }, { where: { protocolo } });

        }
        
        else if (chamado.status === "EM ANDAMENTO") {
          if (chamado.responsavel !== user.name) {
            throw new Error("Apenas o responsável pelo chamado pode fecha-lo!");
          }

          await Chamados.update({
            status,
            justificativa_fechado: justificativa,
            fechamento: DateUtils.formatDateTime()

          }, { where: { protocolo } });

        }
        else {
          throw new Error("Chamado não pode ser fechado!");
        }
      }
      else {
        throw new Error(`Status "${status}" inválido para atualização!`);
      }

      return res.json({
        protocolo,
        status,
        responsavel: user.name,

        message: "Status do chamado atualizado com sucesso!",
      });

    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao atualizar status do chamado!");
    }
  }

  //CONSULTAR CHAMADOS FECHADOS
  static async getClosedTickets(req, res) {
    try {
      const chamados = await Chamados.findAll({
        attributes: [
          //dados do sistema
          "protocolo",
          "prioridade",
          "abertura",

          //dados do usuário
          "nome",
          "email",
          "celular",
          "anydesk",
          "n_patrimonio",
          "estado",
          "setor",
          "problema",
          "descricao",

          //dados do atendimento
          "justificativa_em_andamento",
          "responsavel",
          "justificativa_fechado",
          "fechamento"
        ],

        where: { status: ["FECHADO"] },
        //ordena do mais recente ao mais antigo
        order: [["abertura", "DESC"]] 
      });

      return res.json({ chamados });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao consultar chamados fechados!");
    }
  }
}