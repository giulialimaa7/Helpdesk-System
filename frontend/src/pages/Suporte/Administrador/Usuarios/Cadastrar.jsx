import servidor from "../../../../hooks/api.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAlert } from "../../../../context/Alert/useAlert.jsx";
import { COLORS } from "../../../../styles/colors.js";
import { PageForm } from "../../../../components/layout/PageForm.jsx";
import { StackColumn } from "../../../../components/layout/StackColumn.jsx";
import { StackRow } from "../../../../components/layout/StackRow.jsx";
import {
  TextField,
  Box,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

const circuloSx = {
  width: 28,
  height: 28,
  fontSize: 13,
  flexShrink: 0,
  display: "flex",
  fontWeight: 700,
  borderRadius: "50%",
  color: COLORS.branco,
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${COLORS.verde}, ${COLORS.verdeEscuro})`,
}

export const CadastrarUsuario = () => {
  const api = servidor();
  const navigate = useNavigate();
  const { showAlert, hideAlert } = useAlert();

  const [isLoading, setIsLoading] = useState(false);

  const [usuarios, setUsuarios] = useState([
    { nome: "", email: "", permissao: "" },
  ]);

  const addUsuario = () => {
    setUsuarios((prev) => 
      [...prev, { nome: "", email: "", permissao: "" }]
    );
  };

  const removeUsuario = (index) => {
    setUsuarios((prev) => 
      prev.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    setUsuarios((prev) => {
      const copy = [...prev];
      copy[index][field] = value;

      return copy;
    });
  };

  const handleSubmit = async () => {
    const algumVazio = usuarios.some(
      (u) => !u.nome || !u.email || !u.permissao,
    );

    if (algumVazio) {
      return showAlert(
        "Preencha todos os campos de cada usuário!", 
        "warning"
      );
    }

    setIsLoading(true);

    for (const usuario of usuarios) {
      const req = await api.postUser(
        usuario.nome,
        usuario.email,
        usuario.permissao,
      );

      if (req.existe === true) {
        showAlert(req.message, "info");
        setIsLoading(false);
        return;
      } 
      else if (req.existe !== false) {
        showAlert(
          "Não foi possível cadastrar um ou mais usuários!", 
          "warning"
        );
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
    setUsuarios([{ nome: "", email: "", permissao: "" }]);
    hideAlert();

    showAlert(
      `${usuarios.length} usuário${usuarios.length > 1 ? "s cadastrados" : " cadastrado"} com sucesso!`,
      "success",
      true,
    );
  };

  return (
    <PageForm title="CADASTRAR USUÁRIOS" maxWidth="900px">
      {/* HEADER FIXO — usuário 1 + botões */}
      <Stack
        mb={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack 
          gap={1}
          direction="row" 
          alignItems="center" 
        >
          <Box sx={{...circuloSx }}> 
            1 
          </Box>

          <Typography
            fontSize={13}
            fontWeight={700}
            letterSpacing={0.5}
            color={COLORS.texto1}
          >
            USUÁRIO
          </Typography>
        </Stack>

        <Stack direction="row" gap={1}>
          {usuarios.length > 1 && (
            <Button
              size="small"
              variant="text"
              startIcon={<RemoveCircleOutlineIcon />}
              onClick={() => removeUsuario(usuarios.length - 1)}
              sx={{
                fontSize: 12,
                textTransform: "none",
                color: COLORS.vermelho,

                "&:hover": { background: COLORS.accentVermelho },
              }}
            >
              REMOVER
            </Button>
          )}
          <Button
            size="small"
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addUsuario}
            sx={{
              color: COLORS.verde,
              fontSize: 12,
              textTransform: "none",

              "&:hover": { background: COLORS.verdeClaro },
            }}
          >
            ADICIONAR
          </Button>
        </Stack>
      </Stack>

      {/* LISTA */}
      <StackColumn spacing={3}>
        {usuarios.map((usuario, index) => (
          <Box key={index}>

            {/* SEPARADOR COM NÚMERO — só a partir do 2º usuário */}
            {index !== 0 && (
              <Stack direction="row" alignItems="center" gap={1.5} mb={3}>
                <Box sx={{...circuloSx}}>
                  {index + 1}
                </Box>
                <Typography
                  fontSize={13}
                  fontWeight={700}
                  letterSpacing={0.5}
                  color={COLORS.texto1}
                >
                  {" "}
                  USUÁRIO{" "}
                </Typography>

                <Divider sx={{ my: 2, flex: 1, borderColor: COLORS.verdeBorda }} />
              </Stack>
            )}

            <StackRow>
              <TextField
                required
                type="text"
                label="Nome Completo"
                value={usuario.nome}
                onChange={(e) => handleChange(index, "nome", e.target.value)}
              />
              <TextField
                required
                type="email"
                label="Email"
                value={usuario.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
              />
              <TextField
                required
                type="number"
                label="Permissão"
                value={usuario.permissao}
                onChange={(e) => handleChange(index, "permissao", e.target.value)}
              />
            </StackRow>
          </Box>
        ))}
      </StackColumn>

      {/* BOTÕES */}
      <StackRow mt={6}>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
        >
          VOLTAR
        </Button>

        <Button
          fullWidth
          variant="primary"
          disabled={isLoading}
          onClick={handleSubmit}
          //endIcon={<PersonAddIcon />}
        >
          {isLoading ? "CADASTRANDO..." : "CADASTRAR"}
        </Button>
      </StackRow>
    </PageForm>
  );
};
