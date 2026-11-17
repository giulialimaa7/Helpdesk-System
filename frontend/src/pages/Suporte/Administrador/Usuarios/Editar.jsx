import servidor from "../../../../hooks/api.js";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAlert } from "../../../../context/Alert/useAlert.jsx";
import { COLORS } from "../../../../styles/colors.js";
import { PageForm } from "../../../../components/layout/PageForm.jsx";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Stack,
} from "@mui/material";

export const EditarUsuario = () => {
  const api = servidor();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert, hideAlert } = useAlert();

  const usuario = location.state?.usuario || {};

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState(usuario.name || "");
  const [email, setEmail] = useState(usuario.email || "");
  const [permissao, setPermissao] = useState(usuario.permissao || "");

  const handleSave = async () => {
    if (!nome || !email || !permissao) {
      return showAlert(
        `Preencha os campos para atualizar as credenciais de ${usuario.name}!`,
        "warning",
      );
    }

    try {
      setIsLoading(true);
      const req = await api.patchUser(usuario.id, nome, email, permissao);

      if (!req) {
        showAlert("Erro ao atualizar credenciais!", "error");
        setIsLoading(false);
        return;
      }

      showAlert("Credenciais atualizadas com sucesso!", "success", true);

      setTimeout(() => {
        hideAlert();
        navigate("/suporte/administrador/usuarios");
      }, 4000);
    } 
    catch (error) {
      console.error(error);
      showAlert("Erro ao atualizar credenciais. Tente novamente!", "error");
      setIsLoading(false);
    }
  };

  return (
    <PageForm 
      mt={6}
      maxWidth="500px" 
      title="EDITAR USUÁRIO" 
    >
      {/* AVATAR */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mb: 1.5,
            width: 100,
            height: 100,
            display: "flex",
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro})`,
          }}
        >
          <PersonIcon sx={{ fontSize: 55, color: COLORS.branco }} />
        </Box>

        <Typography
          fontSize={20}
          fontWeight={700}
          color={COLORS.texto1}
        >
          {usuario.name.toUpperCase() || "USUÁRIO"}
        </Typography>
      </Box>

      {/* CAMPOS */}
      <Stack gap={2.5}>
        <TextField 
          disabled 
          label="ID" 
          value={usuario.id} 
        />
        <TextField
          required
          type="text"
          value={nome}
          label="Nome Completo"
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          required
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          type="number"
          value={permissao}
          label="Permissão"
          onChange={(e) => setPermissao(e.target.value)}
        />
      </Stack>

      {/* BOTÕES */}
      <Stack 
        mt={2} 
        gap={2} 
        direction="row"
      >
        <Button
          fullWidth
          variant="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          VOLTAR
        </Button>

        <Button
          fullWidth
          variant="primary"
          endIcon={<CheckIcon />}
          disabled={isLoading}
          onClick={handleSave}
        >
          {isLoading ? "SALVANDO..." : "SALVAR"}
        </Button>
      </Stack>
    </PageForm>
  );
};