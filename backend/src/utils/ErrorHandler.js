export default class ErrorHandler {
  static #getStatusCode (error, message) {
    //verifica se o erro já tem um statusCode definido
    if (error?.statusCode) 
      return error.statusCode;

    //usa status se disponível (padrão de alguns frameworks)
    if (error?.status && typeof error.status === "number") 
      return error.status;

    //,apeia baseado na mensagem (case-insensitive)
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("não encontrado") || lowerMessage.includes("not found")) 
      return 404;
    
    if (lowerMessage.includes("token") || 
        lowerMessage.includes("não autorizado") || 
        lowerMessage.includes("unauthorized")) 
      //401 é mais apropriado que 403 para problemas de autenticação
      return 401; 
    
    if (lowerMessage.includes("proibido") || 
        lowerMessage.includes("forbidden") ||
        lowerMessage.includes("permissão")) 
      return 403;
    
    if (lowerMessage.includes("inválido") || 
        lowerMessage.includes("invalid") ||
        lowerMessage.includes("bad request")) 
      return 400;

    //padrão para erros não mapeados
    return 500;
  }

  static handleError(error, res, customMessage = "Erro interno do servidor.") {
    console.error("ERRO:", error);

    //extrai a mensagem de erro de forma segura
    const message = typeof error === "string" 
      ? error 
      : error?.message || customMessage;

    //determina o status HTTP 
    const status = this.#getStatusCode(error, message);

    //adiciona stack trace em desenvolvimento
    const response = { message };

    if (process.env.NODE_ENV === "development" && error?.stack)
      response.stack = error.stack;

    return res.status(status).json(response);
  }
}