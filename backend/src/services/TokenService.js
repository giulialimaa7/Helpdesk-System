import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import ResetToken from '../models/resetToken.js';
import TokenUtils from '../utils/TokenUtils.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export default class TokenService {
  static async validateLoginToken(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          isValid: false,
          message: "Token não fornecido"
        });
      }

      //timestamp atual em segundos
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTimestamp) {
        return res.json({
          //token expirado 
          isValid: false,
          message: "Token expirado!"
        });
      }
      return res.json({ isValid: true }); //token válido
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Token inválido!");
    }
  }

  static validateBearerToken(req) {
    //espera o token na header "Authorization: Bearer token"
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      throw new Error("Token não fornecido!");

    //decodifica o token JWT para obter o ID do usuário 
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static async findUserByToken(req) {
    try {
      const decoded = this.validateBearerToken(req);
      //o id do usuário está no payload do token
      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user)
        throw new Error("Usuário não encontrado!");

      return user;
    }
    catch (error) {
      throw new Error("Erro ao buscar usuário pelo token!")
    }
  }

  static async validateResetToken(req, res) {
    try {
      const { token } = req.params;

      if (!token) {
        throw new Error("Token não fornecido!");
      }

      const resetToken = await ResetToken.findOne({ where: { token } });

      if (!resetToken) {
        throw new Error("Token inválido!");
      }

      if (TokenUtils.isTokenExpired(resetToken.createdAt)) {
        await resetToken.destroy();
        throw new Error("Token expirado!");
      }
      return res.json({ message: "Token válido" });
    }
    catch (error) {
      return ErrorHandler.handleError(error, res, "Erro ao validar token!");
    }
  }
}