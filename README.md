# Helpdesk System 

Sistema de Helpdesk desenvolvido para gerenciamento de chamados técnicos, controle de usuários e fluxo de atendimento interno.

---

## Sobre o projeto

O Helpdesk é uma aplicação web desenvolvida para centralizar e organizar solicitações de suporte técnico dentro de uma empresa.

O sistema possui autenticação de usuários, controle de permissões por nível de acesso, abertura e gerenciamento de chamados, atualização de status em tempo real e fluxo de atendimento entre usuários e administradores.

---

# Funcionalidades

## Usuário comum
- Abertura de chamados
- Visualização apenas dos próprios chamados
- Acompanhamento de status
- Histórico de solicitações

## Administrador
- Visualização de todos os chamados
- Atualização de status
- Atendimento de solicitações
- Encerramento de chamados
- Registro de justificativas
- Manipulação de usuários

## Sistema
- Autenticação com JWT
- Controle de permissões
- Integração frontend/backend
- API REST
- Persistência em banco de dados
- Recuperação de senha via email
- Interface responsiva

---

# Tecnologias utilizadas

## Frontend
- React (Vite)
- Material UI e Ant Design
- Recharts
- Axios
- React Router

## Backend
- Node.js
- Express
- Sequelize
- JWT
- MySQL
- Nodemailer

---

# Estrutura do projeto

```bash
Helpdesk-System/
├── backend/
└── frontend/
```

---

# Instalação

## Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## Backend

```bash
cd backend
npm install
```

### Configure as variáveis de ambiente

Copie `backend/.env.example` para `backend/.env` e preencha os valores (banco MySQL, `JWT_SECRET`, conta de e-mail, `FRONTEND_URL` e `DEFAULT_USER_PASSWORD`, a senha temporária de primeiro acesso).

> Nunca faça commit do arquivo `.env`.

### Execute o backend

```bash
npm run nodemon
```

---

## Frontend

```bash
cd frontend
npm install
```

### Configure as variáveis de ambiente

Copie `frontend/.env.example` para `frontend/.env` e informe `VITE_API_URL` (URL da API) e `VITE_SUPER_ADMIN_EMAIL` (e-mail do administrador que cadastra usuários).

> O gráfico de chamados por responsável (`Dashboard.jsx`) usa uma lista fixa de analistas de exemplo. Ajuste os nomes para a sua equipe.

### Execute o frontend

```bash
npm run dev
```

---

# Fluxo da aplicação

1. Usuário realiza login
2. Sistema valida o JWT
3. Usuário abre um chamado
4. Administrador de TI recebe e atualiza o status
5. Sistema registra histórico e justificativas
6. Chamado só pode ser finalizado pelo responsável

---

# Diferenciais do projeto

- Arquitetura fullstack
- Sistema real de permissões
- Fluxo completo de atendimento
- Recuperação de senha
- Separação entre frontend e backend
- Estrutura escalável
- Projeto aplicado em cenário corporativo

---

# Melhorias futuras

- Upload de anexos
- Notificações em tempo real
- Logs de atividades
- Testes automatizados
- Módulo patrimônios (frontend concluído e backend em desenvolvimento)

---

# Autor

Desenvolvido por Giulia Vargas.
