export default class Validator {
  static validateFields(body, requiredFields, res) {
    for (const field of requiredFields) {
      if (!body[field]) {
       throw new Error(`Campo obrigatório "${ field }" está vazio!`);
      }
    }
  }
}