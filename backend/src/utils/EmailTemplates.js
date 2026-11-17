export default class EmailTemplates {
  static generateWelcomeEmailHtml(nome, email, password) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

        <h2 style="color: #333;"> Bem-vindo(a) ao Helpdesk </h2>
        <p> 
          Olá<strong> ${nome} </strong>, <br/>
          seu acesso ao <strong>Helpdesk</strong> 
          foi criado com sucesso pela equipe de TI.
        </p>

        <p> Para realizar o primeiro acesso, utilize as seguintes credenciais: </p>
        <ul>
          <li> <strong>Email:</strong> ${email} </li>
          <li> <strong>Senha:</strong> ${password} </li>
        </ul>

        <p style="color: #B22222; font-weight: bold;">
          Importante: por motivos de segurança, 
          é obrigatório a troca de senha após o primeiro acesso.
        </p>

        <h3> 🔑 Como trocar sua senha </h3>
        <p> Para alterar sua senha, basta acessar a tela de login do sistema em seguida:</p>
        <ol>
          <li> Clique em <strong>“Esqueci minha senha”</strong>. </li>
          <li> Informe seu endereço de email. </li>
          <li> Verifique sua caixa de entrada e siga o link enviado. </li>
          <li> Defina uma nova senha de sua preferência. </li>
        </ol>
        <p> Esse procedimento garante maior segurança e protege suas informações no sistema. </p>
          
        <div style="margin: 30px 0; text-align: center;">
          <a 
            href="${process.env.FRONTEND_URL || '#'}"
            style="background-color: #0066CC; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 4px; 
              font-weight: bold;"
          > 
            ACESSAR HELPDESK
          </a>
        </div>

        <p> 
          Anexamos a este email um manual de uso com instruções detalhadas 
          para facilitar sua experiência no Helpdesk. 
        </p>
        <p> Em caso de dúvidas, entre em contato com o suporte de TI. </p>
        <p> Atenciosamente, <br> Equipe de TI </p>
      </div>
    `;
  }

  static generateResetEmailHtml(resetUrl) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

        <h2 style="color: #333;"> Redefinição de Senha </h2>
        <p> Olá, </p>
        <p> Recebemos uma solicitação para redefinir a senha da sua conta no Helpdesk. </p>
        <p> Para redefinir sua senha, clique no botão abaixo: </p>

        <div style="margin: 30px 0; text-align: start;">
          <a 
            href="${resetUrl}" 
            style="background-color: #0066CC; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 4px; 
              font-weight: bold;
              text-align: start;"
          > 
            REDEFINIR SENHA
          </a>
        </div>

        <p> Este link expirará em 1 hora por razões de segurança. </p>
        <p> Atenciosamente,<br>Equipe de TI </p>

      </div>
    `;
  }

  static generatePasswordChangedEmailHtml() {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

        <h2 style="color: #333;"> Senha Alterada </h2>
        <p> Olá, </p>
        <p> sua senha foi alterada com sucesso! </p>
        <p> Se você não realizou esta alteração, entre em contato imediatamente com nossa equipe de suporte. </p>
        <p> Atenciosamente,<br> Equipe de TI </p>

      </div>
    `;
  }
}