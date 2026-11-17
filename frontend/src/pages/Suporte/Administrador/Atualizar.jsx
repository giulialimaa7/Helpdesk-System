import servidor from "../../../hooks/api.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../../../styles/colors.js";
import { useAlert } from "../../../context/Alert/useAlert.jsx";
import { PageForm } from "../../../components/layout/PageForm.jsx";
import { StackColumn } from "../../../components/layout/StackColumn.jsx";
import { StackRow } from "../../../components/layout/StackRow.jsx";
import {
  TextField,
  MenuItem,
  Button,
  Divider,
  Stack,
} from "@mui/material";

const STATUS_OPTIONS = { 
  ABERTO: ["EM ANDAMENTO", "FECHADO"],
  "EM ANDAMENTO": ["FECHADO"],
};

export const AtualizarChamado = () => {
  const api = servidor();
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert, hideAlert } = useAlert();

  const user = localStorage.getItem("nome");
  const chamado = location.state?.chamados || {};

  const isAberto = chamado.status === "ABERTO";
  const isEmAndamento = chamado.status === "EM ANDAMENTO";
  const statusOptions = STATUS_OPTIONS[chamado.status] || [];

  const [status, setStatus] = useState(statusOptions[0] || "");
  const [isLoading, setIsLoading] = useState(false);

  const [justAndamento, setJustAndamento] = useState(
    chamado.justificativa_em_andamento 
      && chamado.justificativa_em_andamento !== "N/A"
      ? chamado.justificativa_em_andamento
      : "",
  );

  const [justFechado, setJustFechado] = useState(
    chamado.justificativa_fechado 
      && chamado.justificativa_fechado !== "N/A"
      ? chamado.justificativa_fechado
      : "",
  );

  const handleSave = async () => {
    if (isAberto && !justAndamento)
      return showAlert("Preencha a justificativa!", "warning")
    ;
    if (isEmAndamento && !justFechado)
      return showAlert("Preencha a justificativa de fechamento!", "warning")
    ;
    if (isEmAndamento && status === "FECHADO" && chamado.responsavel !== user)
      return showAlert(
        "Apenas o responsável pode fechar este chamado.",
        "warning",
      )
    ;

    const justFinal = isAberto ? justAndamento : justFechado;

    try {
      setIsLoading(true);
      const req = await api.updateStatusTicket(
        chamado.protocolo,
        status,
        justFinal,
      );

      if (!req) {
        showAlert("Erro ao atualizar o chamado.", "error");
        setIsLoading(false);
        return;
      }
      showAlert("Status do chamado foi atualizado!", "success", true);
      setTimeout(() => {
        hideAlert();
        navigate("/suporte/administrador/chamados");
      }, 4000);
    } 
    catch (error) {
      console.error(error);
      showAlert("Erro ao atualizar chamado. Tente novamente!", "error");
      setIsLoading(false);
    }
  };

  return (
    <PageForm title="GERENCIAR CHAMADO" maxWidth="1100px">
      <StackColumn spacing={2.5}>
        <StackRow>
          <TextField
            disabled
            value={chamado.abertura}
            label="Abertura"
          />
          <TextField
            disabled
            value={chamado.protocolo}
            label="Protocolo"
          />
          <TextField
            disabled
            value={chamado.prioridade}
            label="Prioridade"
          />
          <TextField
            disabled
            value={chamado.status}
            label="Status Atual"
          />
        </StackRow>

        <StackRow>
          <TextField 
            disabled 
            value={chamado.nome} 
            label="Nome"  
          />
          <TextField
            disabled
            value={chamado.email}
            label="Email"
          />
          <TextField
            disabled
            value={chamado.n_patrimonio}
            label="Nº Patrimônio"
          />
          <TextField
            disabled
            value={chamado.celular}
            label="Celular"
          />
        </StackRow>

        <StackRow>
          <TextField
            disabled
            value={chamado.estado}
            label="Estado"
          />
          <TextField
            disabled
            value={chamado.setor}
            label="Setor"
          />
          <TextField
            disabled
            value={chamado.anydesk}
            label="Anydesk"
          />
          <TextField
            disabled
            value={chamado.problema}
            label="Problema"
          />
        </StackRow>

        <StackRow>
          <TextField
            disabled
            multiline
            rows={5}
            label="Descrição"
            value={chamado.descricao}
          />
        </StackRow>

        <Divider sx={{borderColor: COLORS.verdeBorda}} />

        <StackRow>
          <TextField
            disabled
            value={chamado.responsavel}
            label="Responsável"
          />

          <TextField
            select
            value={status}
            label="Novo Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{ fontSize: 14 }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>
        </StackRow>

        <StackRow>
          <TextField
            rows={4}
            multiline
            value={justAndamento}
            disabled={isEmAndamento}
            label="Justificativa"
            placeholder="Descreva a atualização do chamado"
            onChange={(e) => setJustAndamento(e.target.value)}
          />

          {isEmAndamento && (
            <TextField
              multiline
              rows={4}
              value={justFechado}
              label="Justificativa de Fechamento"
              placeholder="Descreva o motivo do fechamento"
              onChange={(e) => setJustFechado(e.target.value)}

            />
          )}
        </StackRow>
      </StackColumn>

      {/* BOTÕES */}
      <Stack direction="row" spacing={2} mt={4}>
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
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "SALVANDO..." : "SALVAR"}
        </Button>
      </Stack>
    </PageForm>
  );
};