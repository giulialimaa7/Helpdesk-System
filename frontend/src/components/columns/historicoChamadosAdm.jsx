import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

export const historicoChamadosAdm = (navigate) => [
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
  },
  {
    title: "Abertura",
    dataIndex: "abertura",
    key: "abertura",
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
    title: "Fechamento",
    dataIndex: "fechamento",
    key: "fechamento",
  },
  {
    title: "",
    key: "acoes",
    align: "center",
    render: (_, record) => (
      <Tooltip title="Visualizar detalhes do chamado"> 
        <IconButton
          size="small"
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              `/suporte/administrador/chamados/detalhes/${record.key}`,
              { state: { chamadosEncerrados: record } }
            );
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];