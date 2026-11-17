import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/users.js';
import ResetToken from '../models/resetToken.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import EmailTemplates from '../utils/EmailTemplates.js';
import TokenUtils from '../utils/TokenUtils.js';
import PasswordService from '../services/PasswordService.js';
import EmailService from '../services/EmailService.js';

export default class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) 
        throw new Error("Email e senha são obrigatórios!");

      const user = await User.findOne({ where: {email} });

      if (!user)
        throw new Error("Usuário não encontrado!");

      const isPasswordValid = await PasswordService.comparePasswords(password, user.password);

      //se a senha informada é válida
      if (isPasswordValid) {
        //caso a senha do banco ainda esteja em texto plano (sem hash), gera o hash e atualiza
        if (user.password.length < 60) {
          user.password = await PasswordService.hashPassword(password);
          await user.save();
        }
      }
      else {
        throw new Error("Email e/ou senha incorretos!");
      }

      //gera o token JWT para qualquer usuário autenticado
      const token = jwt.sign(
        {
          id: user.id,
          permissao: user.permissao
        },

        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        user: {
          id: user.id,
          email: user.email,
          nome: user.name,
          permissao: user.permissao
        }, 
        
        token
      });
    } 
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao fazer login!");
    }
  }

  //solicitar redefinição de senha
  static async requestPassword(req, res) {
    const genericRes =  { 
      message: "Se este email estiver registrado, você receberá um link para redefinir sua senha." 
    };

    try {
      const { email } = req.body;

      if (!email)
        throw new Error("Email é obrigatório!");

      const user = await User.findOne({ where: {email} });

      if (!user)
        return res.json(genericRes);

      //remove tokens antigos do usuário
      await ResetToken.destroy({ where: {userId: user.id} });
      //cria um novo token
      const resetToken = uuidv4() + crypto.randomBytes(20).toString('hex');

      await ResetToken.create({
        userId: user.id,
        token: resetToken,
        //registra a data atual
        createdAt: new Date()
      });

      const site = process.env.FRONTEND_URL || "http://localhost:5173";
      const resetUrl = `${ site }/redefinir-senha?token=${ resetToken }`;
      const emailHTML = EmailTemplates.generateResetEmailHtml(resetUrl);

      await EmailService.sendEmail(
        user.email,
        'Redefinição de Senha - Helpdesk',
        emailHTML
      )

      return res.json(genericRes);
    } 
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao processar solicitação!");
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword)
        throw new Error("Token e nova senha são obrigatórios!");

      const resetToken = await ResetToken.findOne({ where: {token} });

      if (!resetToken) 
        throw new Error("Token inválido ou expirado!");

      if (TokenUtils.isTokenExpired(resetToken.createAt)) {
        await resetToken.destroy();
        throw new Error("Token expirado!");
      }

      const user = await User.findByPk(resetToken.userId);
      
      if (!user) {
        throw new Error("Usuário não encontrado!");
      }

      //atualiza senha
      user.password = await PasswordService.hashPassword(newPassword);
      await user.save();
      //remove token usado
      await resetToken.destroy();
      //envia email de confirmação
      const emailHTML = EmailTemplates.generatePasswordChangedEmailHtml();

      await EmailService.sendEmail(
        user.email,
        'Senha Alterada com Sucesso - Helpdesk', 
        emailHTML
      );

      return res.json({ message: "Senha redefinida com sucesso!"});
    } 
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao redefinir senha!");
    }
  }
}