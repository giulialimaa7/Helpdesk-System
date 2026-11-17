import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { PageForm } from "../../../components/layout/PageForm.jsx";
import { StackColumn } from "../../../components/layout/StackColumn.jsx";
import { StackRow } from "../../../components/layout/StackRow.jsx";

export const DetalhesChamado = () => {
  const location = useLocation();
  const historico = location.state?.chamadosEncerrados || {};

  return (
    <PageForm
      mt={2}
      maxWidth="1100px"
      title="DETALHES DO CHAMADO"
    >
      <StackColumn spacing={2.5}>
        <StackRow>
          <TextField 
            disabled
            label="Protocolo" 
            value={historico.protocolo}
          />
          <TextField 
            disabled 
            label="Abertura" 
            value={historico.abertura} 
          />
          <TextField 
            disabled 
            label="Fechamento" 
            value={historico.fechamento} 
          />
          <TextField
            disabled
            label="N° Patrimônio"
            value={historico.n_patrimonio}
          />
        </StackRow>

        <StackRow>
          <TextField 
            disabled 
            label="Nome" 
            value={historico.nome} 
          />
          <TextField 
            disabled 
            label="Email" 
            value={historico.email} 
          />
          <TextField 
            disabled 
            label="Celular" 
            value={historico.celular} 
          />
          <TextField 
            disabled 
            label="Estado" 
            value={historico.estado} 
          />
        </StackRow>

        <StackRow>
          <TextField 
            disabled 
            label="Anydesk" 
            value={historico.anydesk} 
          />
          <TextField 
            disabled 
            label="Setor" 
            value={historico.setor} 
          />
          <TextField 
            disabled 
            label="Problema" 
            value={historico.problema} 
          />
          <TextField
            disabled
            label="Responsável"
            value={historico.responsavel}
          />
        </StackRow>

        <StackRow>
          <TextField
            disabled
            multiline
            rows={4}
            label="Descrição"
            value={historico.descricao}
          />
        </StackRow>

        <StackRow>
          <TextField
            disabled
            multiline
            rows={4}
            label="Justificativa em andamento"
            value={historico.justificativa_em_andamento}
          />
        </StackRow>

        <StackRow>
          <TextField
            disabled
            multiline
            rows={4}
            label="Justificativa fechado"
            value={historico.justificativa_fechado}
          />
        </StackRow>
      </StackColumn>
    </PageForm>
  );
};