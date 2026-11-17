import { Op } from 'sequelize';

export default class ProtocoloService {
  static async generateProtocol(model) {
    const year = new Date().getFullYear();
    const last = await model.findOne({
      where: { protocolo: { [Op.startsWith]: year.toString() } },
      order: [["protocolo", "DESC"]]
    });
    
    //extraindo os últimos 4 dígitos do protocolo anterior e incrementando
    const lastNumber = last ? parseInt(last.protocolo.slice(-4), 10) + 1 : 1;
    //garantindo que o número tenha sempre 4 dígitos (exemplo: 0001)
    const formattedNumber = String(lastNumber).padStart(4, "0");
    //gerando protocolo final (exemplo: 20250001) 
    return `${ year }${ formattedNumber }`;
  }
}