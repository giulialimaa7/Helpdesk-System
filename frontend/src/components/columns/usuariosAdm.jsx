import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

export const usuariosAdm = (
  navigate,
  handleDelete,
  setFuncionalidade
) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    searchable: true,
  },
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    searchable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    searchable: true,
  },
  {
    title: "Senha",
    dataIndex: "password",
    key: "password",
  },
  {
    title: "Permissão",
    dataIndex: "permissao",
    key: "permissao",
    searchable: true,
    
    render: (value) => {
      const funcao = setFuncionalidade(value);
      return `${value} - ${funcao}`;
    },
  },

  {
    title: "",
    key: "editar",
    align: "center",
    render: (_, record) => (
      <Tooltip title="Editar dados do usuário">
        <IconButton
          size="small"
          color="success"
          onClick={(e) => {
            e.stopPropagation();
            navigate(
              `/suporte/administrador/usuarios/editar/${record.id}`,
              { state: { usuario: record } }
            );
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },

  {
    title: "",
    key: "excluir",
    align: "center",
    render: (_, record) => (
      <Tooltip title="Excluir usuário">
        <IconButton
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(record);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];