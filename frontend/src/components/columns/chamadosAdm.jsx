import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

export const chamadosAdm = (navigate, getPrioridade) => [
  {
    title: "Protocolo",
    dataIndex: "protocolo",
    key: "protocolo",
    searchable: true,
  },
  {
    title: "Prioridade",
    dataIndex: "prioridade",
    key: "prioridade",
    filters: [
      { text: "ALTA", value: "ALTA" },
      { text: "MÉDIA", value: "MÉDIA" },
      { text: "BAIXA", value: "BAIXA" },
    ],
    onFilter: (value, record) => record.prioridade === value,
    render: (text) => (
      <span style={{ color: getPrioridade(text), fontWeight: 600 }}>
        {text}
      </span>
    ),
  },
  {
    title: "Abertura",
    dataIndex: "abertura",
    key: "abertura",
  },
  {
    title: "Setor",
    dataIndex: "setor",
    key: "setor",
    filters: [
      { text: "Administrativo", value: "Administrativo" },
      { text: "Alta Tensão", value: "Alta Tensão" },
      { text: "Comercial", value: "Comercial" },
      { text: "Comunicação", value: "Comunicação" },
      { text: "Desenvolvimento e Controle", value: "Desenvolvimento e Controle" },
      { text: "Diretoria", value: "Diretoria" },
      { text: "Energisa Tocantins", value: "Energisa Tocantins" },
      { text: "Frota", value: "Frota" },
      { text: "Fundiário", value: "Fundiário" },
      { text: "Gás", value: "Gás" },
      { text: "Gerência", value: "Gerência" },
      { text: "Meio Ambiente", value: "Meio Ambiente" },
      { text: "MT / BT", value: "MT / BT" },
      { text: "RH", value: "RH" },
      { text: "Renováveis", value: "Renováveis" },
      { text: "Saneamento", value: "Saneamento" },
      { text: "Segurança do Trabalho", value: "Segurança do Trabalho" },
      { text: "SGI", value: "SGI" },
      { text: "TI", value: "TI" },
      { text: "Outros", value: "Outros" },
    ],
    onFilter: (value, record) => record.setor === value,
  },
  {
    title: "Nome",
    dataIndex: "nome",
    key: "nome",
    searchable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    searchable: true,
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    searchable: true,
  },
  {
    title: "Setor",
    dataIndex: "setor",
    key: "setor",
    searchable: true,
  },
  {
    title: "Responsável",
    dataIndex: "responsavel",
    key: "responsavel",
    searchable: true,
  },
  {
    title: "",
    key: "acoes",
    align: "center",
    render: (_, record) => (
      <Tooltip title="Atualizar o status do chamado">
        <IconButton
          size="small"
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              `/suporte/administrador/chamados/editar/${record.key}`,
              { state: { chamados: record } }
            );
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];