import headset from "../../../../assets/icons/headset.png";
import historico from "../../../../assets/icons/historico.png";
import users from "../../../../assets/icons/users.png";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { ActionCard } from "../../../../components/ui/ActionCard";

export const ActionCards = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        gap: 3,
        display: "flex",
        flexWrap: "wrap",
        
        "& > *": {
          minWidth: "220px",
          flex: "1 1 calc(33.333% - 16px)",
        },
      }}
    >
      <ActionCard
        icon={headset}
        title="CHAMADOS"
        description="GERENCIAR CHAMADOS"
        onClick={() => navigate("/suporte/administrador/chamados")}
      />
      <ActionCard
        icon={historico}
        title="HISTÓRICO"
        description="CHAMADOS FINALIZADOS"
        onClick={() => navigate("/suporte/administrador/chamados/historico")}
      />
      <ActionCard
        icon={users}
        title="USUÁRIOS"
        description="GERENCIAR USUÁRIOS"
        onClick={() => navigate("/suporte/administrador/usuarios")}
      />
    </Grid>
  );
};