import User from '../models/users.js';

import Validator from '../utils/Validator.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import EmailTemplates from '../utils/EmailTemplates.js';

import EmailService from '../services/EmailService.js';

export default class UserController {
  //ADMINISTRADOR TI
  //CONSULTA TODOS OS USUÁRIOS
  static async selectUsers(req, res) {
    try {
      const usuarios = await User.findAll();
      return res.json({ usuarios });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao buscar usuarios!");
    }
  }
  
  //CRIA USUÁRIOS
  static async insertUser(req, res) {
    try {
      const requeredFields = ["nome", "email", "permissao"];
      Validator.validateFields(req.body, requeredFields);

      const { nome, email, permissao } = req.body;
      const password = process.env.DEFAULT_USER_PASSWORD;

      if (!password)
        throw new Error("DEFAULT_USER_PASSWORD não configurada!");

      const [ user, created ] = await User.findOrCreate({
        where: { email },
        defaults: {
          name: nome,
          email,
          password,
          permissao
        }
      });

      if (!created)
        return res.status(200).json({
          message: "Usuário já cadastrado com este email!",
          existe: true,
        });

      //monta o HTML do email
      const html = EmailTemplates.generateWelcomeEmailHtml(nome, email, password);
      const subject = "Acesso Helpdesk TI";

      //manual em PDF (opcional): link de download direto definido em MANUAL_PDF_URL
      const attachments = process.env.MANUAL_PDF_URL
        ? [
            {
              filename: "Manual de abertura de chamado.pdf",
              path: process.env.MANUAL_PDF_URL,
              contentType: "application/pdf"
            }
          ]
        : []
      ;

      await EmailService.sendEmail(
        email,
        subject,
        html,
        attachments
      )

      return res.status(201).json({
        message: "Usuário criado com sucesso e email de boas vindas enviado!",
        existe: false,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          permissao: user.permissao
        }
      });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao cadastrar usuário!");
    }
  }

  //ATUALIZA DADOS DOS USUÁRIOS
  static async updateUser(req, res) {
    try {
      const requiredFields = ["id", "nome", "email", "permissao"];
      Validator.validateFields(req.body, requiredFields);

      const { id, nome, email, permissao } = req.body;
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error("Usuário não encontrado!");
      }

      await User.update(
        { name: nome, email, permissao },
        { where: { id } }
      );

      return res.json({ message: "Credenciais do usuário atualizadas com sucesso!" });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao atulizar credencias do usuário!");
    }
  }

  //DELETA USUÁRIOS
  static async deleteUser(req, res) {
    try {
      const requiredFields = ["id"];
      Validator.validateFields(req.body, requiredFields);

      const { id } = req.body;
      const user = await User.findByPk(id);

      if (!user) {
       throw new Error("Usuário não encontrado!");
      }

      await User.destroy({ where: { id } });

      return res.json({ message: "Usuário excluído com sucesso!" });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao excluir usuário!");
    }
  }
}