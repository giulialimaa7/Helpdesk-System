import bcrypt from 'bcryptjs';

export default class PasswordService {
  static async comparePasswords(plainPassword, hashedPassword) {
    //verifica se a senha já está criptografada (tamanho comum do hash bcrypt é 60 caracteres)
    if (hashedPassword.length >= 60) {
      return await bcrypt.compare(plainPassword, hashedPassword);
    }
    //se não está criptografada, compara diretamente
    return plainPassword === hashedPassword;
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}