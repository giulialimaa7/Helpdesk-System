import PersonAddIcon from "@mui/icons-material/PersonAdd";
import servidor from "../../../../hooks/api.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAlert } from "../../../../context/Alert/useAlert.jsx";
import { COLORS } from "../../../../styles/colors.js";
import { TableContainer } from "../../../../components/layout/TableContainer.jsx";
import { MyTable } from "../../../../components/ui/MyTable.jsx";
import { usuariosAdm } from "../../../../components/columns/usuariosAdm.jsx";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export const Usuarios = () => {
  const api = servidor();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const usuariosData = await api.getUsers();
        setUsuarios(usuariosData);
      } 
      catch (error) {
        console.log("Erro ao carregar usuários: ", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const confirmDelete = (usuario) => {
    setUsuarioParaExcluir(usuario);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!usuarioParaExcluir) return;
    setDialogOpen(false);

    const req = await api.deleteUser(usuarioParaExcluir.id);

    if (req) {
      showAlert("Usuário excluído com sucesso!", "success");
      setUsuarios((prev) => prev.filter((u) => u.id !== usuarioParaExcluir.id));
    } 
    else {
      showAlert("Erro ao excluir usuário!", "error");
    }
    setUsuarioParaExcluir(null);
  };

  const usuariosComKey = usuarios.map((usuario, index) => ({
    ...usuario,
    key: usuario.id || index,
  }));

  const storedEmail = localStorage.getItem("email");

  return (
    <TableContainer
      title="USUÁRIOS"
      action={
        <Tooltip title="Cadastrar usuários">
          { storedEmail && storedEmail === import.meta.env.VITE_SUPER_ADMIN_EMAIL && (
            <IconButton
              onClick={() => navigate("/suporte/administrador/usuarios/cadastrar")}
              sx={{color: COLORS.branco}}
            >
              <PersonAddIcon sx={{ fontSize: 35 }} />
            </IconButton>
          )}
        </Tooltip>
      }
    >
      <MyTable
        loading={loading}
        data={usuariosComKey}
        columns={usuariosAdm(navigate, confirmDelete)}
      />

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>
          CONFIRMAR EXCLUSÃO
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ fontSize: 16 }}>
            Tem certeza que deseja excluir o usuário 
            <strong> { usuarioParaExcluir?.name }</strong>? 
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            variant="secondary"
            onClick={() => setDialogOpen(false)}
            sx={{
              width: "100px",
              height: "35px",
              fontSize: "12px"
            }}
          >
            CANCELAR
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
            sx={{
              width: "100px",
              height: "35px",
              fontSize: "12px",
              background: COLORS.vermelho,
              boxShadow: "0 4px 12px #E0525233",

              "&:hover": {
                background: COLORS.vermelhoEscuro,
                boxShadow: "0 6px 18px #E0525266",
              },
            }}
          >
            EXCLUIR
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};