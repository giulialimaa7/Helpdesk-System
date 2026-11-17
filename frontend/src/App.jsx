import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import { GlobalStyle } from "./styles/global.js";
import { muiTheme } from "./styles/muiTheme.js";
import { useAuth } from "./context/Auth/AuthProvider.jsx";
import { PageApp } from "./components/layout/PageApp.jsx";
import { COLORS } from "./styles/colors.js";
import { Backdrop, CircularProgress } from "@mui/material";

import { Login } from "./pages/Login.jsx";
import { EsqueciSenha } from "./pages/EsqueciSenha.jsx";
import { RedefinirSenha } from "./pages/RedefinirSenha.jsx";
import { Home } from "./pages/Home.jsx";

//COLABORADOR
import { OpcoesColaborador } from "./pages/Suporte/Colaborador/Menu.jsx";
import { IngressarChamado } from "./pages/Suporte/Colaborador/Ingressar.jsx";
import { ConsultarChamados } from "./pages/Suporte/Colaborador/Consultar.jsx";
import { HistoricoColaborador } from "./pages/Suporte/Colaborador/Historico.jsx";

//SUPORTE
import { OpcoesAdministrador } from "./pages/Suporte/Administrador/Menu.jsx";
import { Chamados } from "./pages/Suporte/Administrador/Chamados.jsx";
import { AtualizarChamado } from "./pages/Suporte/Administrador/Atualizar.jsx";
import { HistoricoChamados } from "./pages/Suporte/Administrador/Historico.jsx";
import { DetalhesChamado } from "./pages/Suporte/Administrador/Detalhes.jsx";

import { Usuarios } from "./pages/Suporte/Administrador/Usuarios/Usuarios.jsx";
import { CadastrarUsuario } from "./pages/Suporte/Administrador/Usuarios/Cadastrar.jsx";
import { EditarUsuario } from "./pages/Suporte/Administrador/Usuarios/Editar.jsx";

// import { Patrimonios } from "./pages/Inventario/Menu.jsx";
// import { GerarQrCode } from "./pages/Inventario/Patrimonios/GerarQrCode.jsx";
// import { CadastrarPatrimonio } from "./pages/Inventario/Patrimonios/Cadastrar.jsx";
// import { Ativos } from "./pages/Inventario/Patrimonios/Ativos.jsx";
// import { DetalhesAtivos } from "./pages/Inventario/Patrimonios/Detalhes.jsx";

// import { SolicitarCompra } from "./pages/Inventario/Compras/Suporte/Solicitar.jsx";
// import { ConsultarSolicitacoes } from "./pages/Inventario/Compras/Suporte/Consultar.jsx";
// import { DetalhesSolitacao } from "./pages/Inventario/Compras/Suporte/Detalhes.jsx";

// //GESTÃO
// import { Solitacoes } from "./pages/Inventario/Compras/Gestao/Solicitacoes.jsx";
// import { AprovacaoSolicitacoes } from "./pages/Inventario/Compras/Gestao/Aprovacao.jsx";

//SUPORTE E GESTÃO
//import { Estoque } from "./pages/Inventario/Estoque/Estoque.jsx";

export function App() {
  const AuthGuard = ({ children }) => {
    const { token, loading } = useAuth();

    if (loading) {
      return (
        <Backdrop 
          open={true} 
          sx={{ color: COLORS.branco, zIndex: 9999 }}
        >
          <CircularProgress color="success" size="3rem"/>
        </Backdrop>
      );
    }
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <PageApp navbar={false} footer={false}>
              <Login />
            </PageApp>
          }
        />

        <Route
          path="/esqueci-senha"
          element={
            <PageApp navbar={false} footer={false}>
              <EsqueciSenha />
            </PageApp>
          }
        />
        <Route
          path="/redefinir-senha"
          element={
            <PageApp navbar={false} footer={false}>
              <RedefinirSenha />
            </PageApp>
          }
        />

        <Route
          path="/home"
          element={
            <AuthGuard>
              <PageApp>
                <Home />
              </PageApp>
            </AuthGuard>
          }
        />

        <Route
          path="/suporte/colaboradores"
          element={
            <AuthGuard>
              <PageApp>
                <OpcoesColaborador />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/colaboradores/ingressar"
          element={
            <AuthGuard>
              <PageApp footer={false}>
                <IngressarChamado />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/colaboradores/consultar"
          element={
            <AuthGuard>
              <PageApp>
                <ConsultarChamados />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/colaboradores/historico"
          element={
            <AuthGuard>
              <PageApp>
                <HistoricoColaborador />
              </PageApp>
            </AuthGuard>
          }
        />

        <Route
          path="/suporte/administrador"
          element={
            <AuthGuard>
              <PageApp>
                <OpcoesAdministrador />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/administrador/chamados"
          element={
            <AuthGuard>
              <PageApp>
                <Chamados />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/administrador/chamados/editar/:id"
          element={
            <AuthGuard>
              <PageApp footer={false}> 
                <AtualizarChamado />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/administrador/chamados/historico"
          element={
            <AuthGuard>
              <PageApp>
                <HistoricoChamados />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/administrador/chamados/detalhes/:id"
          element={
            <AuthGuard>
              <PageApp>
                <DetalhesChamado />
              </PageApp>
            </AuthGuard>
          }
        />

        <Route
          path="/suporte/administrador/usuarios"
          element={
            <AuthGuard>
              <PageApp>
                <Usuarios />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/administrador/usuarios/cadastrar"
          element={
            <AuthGuard>
              <PageApp footer={false}>
                <CadastrarUsuario />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/suporte/administrador/usuarios/editar/:id"
          element={
            <AuthGuard>
              <PageApp footer={false}>
                <EditarUsuario />
              </PageApp>
            </AuthGuard>
          }
        />

      
        {/* 
        <Route
          path="/patrimonios"
          element={
            <AuthGuard>
              <PageApp>
                <Patrimonios />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/gerar-qrcode"
          element={
            <AuthGuard>
              <PageApp>
                <GerarQrCode />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/cadastrar"
          element={
            <AuthGuard>
              <PageApp footer={false}>
                <CadastrarPatrimonio />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/ativos"
          element={
            <AuthGuard>
              <PageApp>
                <Ativos />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/ativos/detalhes/:id"
          element={
            <AuthGuard>
              <PageApp>
                <DetalhesAtivos />
              </PageApp>
            </AuthGuard>
          }
        />

        <Route
          path="/patrimonios/compras/solicitar"
          element={
            <AuthGuard>
              <PageApp footer={false}>
                <SolicitarCompra />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/compras/consultar"
          element={
            <AuthGuard>
              <PageApp>
                <ConsultarSolicitacoes />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/compras/consultar/detalhes/:id"
          element={
            <AuthGuard>
              <PageApp>
                <DetalhesSolitacao />
              </PageApp>
            </AuthGuard>
          }
        /> 
      
        <Route
          path="/patrimonios/compras/solicitacoes"
          element={
            <AuthGuard>
              <PageApp>
                <Solitacoes />
              </PageApp>
            </AuthGuard>
          }
        />
        <Route
          path="/patrimonios/compras/solicitacoes/aprovar/:id"
          element={
            <AuthGuard>
              <PageApp footer={false}>
                <AprovacaoSolicitacoes />
              </PageApp>
            </AuthGuard>
          }
        />

        <Route
          path="/patrimonios/estoque"
          element={
            <AuthGuard>
              <PageApp>
                <Estoque />
              </PageApp>
            </AuthGuard>
          }
        />   
        */}
     
      </Routes>
    </MuiThemeProvider>
  );
}