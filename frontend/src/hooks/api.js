import axios from "axios";

const BASEAPI = import.meta.env.VITE_API_URL || "http://localhost:7777";

export default function servidor(handleLogout) {
  const api = axios.create({
    baseURL: BASEAPI,
  });

  //injeta token automaticamente em cada request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  //intercepta respostas de erro
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token expirou ou inválido → força logout
        if (handleLogout) {
          handleLogout();
        }
      }
      return Promise.reject(error);
    }
  );

  return {
    //LISTAS 
    getUsers: async () => {
      try {
        let res = await api.get("/users");
        return res.data.usuarios;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    getStates: async () => {
      try {
        let res = await api.get("/states");
        return res.data.estados;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    getSectores: async () => {
      try {
        let res = await api.get("/sectors");
        return res.data.setores;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    getProblems: async () => {
      try {
        let res = await api.get("/problems");
        return res.data.problemas;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },

    //LOGIN
    loginUser: async (email, password) => {
      try {
        let res = await api.post("/login", { email, password });
        return res.data;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //ALTERAR PARA VALIDATELOGINTOKEN
    validateToken: async (token) => {
      const res = await api.post("/validate-login-token", { token });
      return res.data;
    },

    //ESQUECI A SENHA
    requestPassword: async (email) => {
      const res = await api.post("/request-password", { email });
      return res.data;
    },
    validateResetToken: async (token) => {
      const res = await api.get(`/validate-reset-token/${token}`);
      return res.data;
    },
    resetPassword: async (token, newPassword) => {
      const res = await api.post("/reset-password", { token, newPassword });
      return res.data;
    },

    //ABRIR CHAMADO
    openTicket: async ( 
      nome,
      email,
      celular,
      anydesk,
      patrimonio,

      estado,
      setor,
      problema,
      descricao
    ) => {
      try {
        let res = await api.post("/ticket/create", {
          nome,
          email,
          celular,
          anydesk,
          n_patrimonio: patrimonio,

          estado,
          setor,
          problema,
          descricao
        })
        return res.data;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //VISUALIZAR CHAMADOS ABERTOS PELO USUÁRIO
    getUserTickets: async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await api.get("/ticket/my-tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.chamados;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //VISUALIZAR CHAMADOS ENCERRADOS DO USUÁRIO LOGADO
    getUserClosedTickets: async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await api.get("/ticket/my-tickets-closed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data.chamados;
      } 
      catch (error) {
        console.error(error);
        return [];  
      }
    },

    //VISUALIZAR TODOS OS CHAMADOS ABERTOS E EM ANDAMENTO
    getTickets: async () => {
      try {
        //let res = await axios.get(`${BASEAPI}/called/open`);
        let res = await api.get("/ticket/open");
        return res.data.chamados;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //ATUALIZAR STATUS DO CHAMADO 
    updateStatusTicket: async (protocolo, status, justificativa) => {
      const token = localStorage.getItem("token");

      try {
        let res = await api.patch("/ticket/update-status", {
          protocolo,
          status,
          justificativa
        },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        return res.data;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //VISUALIZAR CHAMADOS ENCERRADOS
    getClosedTickets: async () => {
      try {
        let res = await api.get("/ticket/closed");
        return res.data.chamados;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //CADASTRAR USUÁRIOS
    postUser: async (nome, email, permissao) => {
      try {
        let res = await api.post("/users/create", {
          nome,
          email,
          permissao
        });
        return res.data;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //EDITAR USUÁRIOS
    patchUser: async (id, nome, email, permissao) => {
      try {
        let res = await api.patch("/users/update", {
          id,
          nome,
          email,
          permissao
        });
        return res.data;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
    //DELETAR USUÁRIOS
    deleteUser: async (id) => {
      try {
        let res = await api.delete("/users/delete", {
          data: { id }
        });
        return res.data;
      }
      catch (error) {
        console.error(error);
        return [];
      }
    },
  }
}