import ingressar from "../../../assets/icons/form.png";
import consultar from "../../../assets/icons/consultar.png";
import historico from "../../../assets/icons/historico.png";
import { useNavigate } from "react-router-dom";  
import { ActionCard } from "../../../components/ui/ActionCard";
import { Box } from "@mui/material";
import { PageHero } from "../../../components/layout/PageHero";
import { SectionTitle } from "../../../components/ui/SectionTitle";

const cardsGridSx = {
  gap: 2,
  display: "flex",
  flexWrap: "wrap",

  "& > *": {
    width: "220px",
    flex: "0 0 auto", //tamanho fixo sempre
    minWidth: "calc(33.333% - 12px)",
  },

  "@media (max-width: 825px)": {
    flexDirection: "column",

    "& > *": {
      width: "100%",
    },
  },
};

export const OpcoesColaborador = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <PageHero title="SUPORTE"/>
      <Box
        sx={{
          py: 5,
          px: 2,
          gap: 6,
          flex: 1,
          mx: "auto",
          width: "100%",
          display: "flex",
          maxWidth: "1250px",
          flexDirection: "column",
        }}
      >
        <SectionTitle title="Chamados"/>
        <Box sx={cardsGridSx}>
          <ActionCard 
            icon={ingressar}
            title="INGRESSAR"
            description="ABRIR NOVO CHAMADO"
            onClick={() => navigate("/suporte/colaboradores/ingressar")}
          />
          <ActionCard 
            icon={consultar}
            title="CONSULTAR"
            description="VER CHAMADOS EM ANDAMENTO"
            onClick={() => navigate("/suporte/colaboradores/consultar")}
          />
          <ActionCard 
            icon={historico}
            title="HISTÓRICO"
            description="VER CHAMADOS FINALIZADOS"
            onClick={() => navigate("/suporte/colaboradores/historico")}
          />
        </Box>
      </Box>
    </Box>
  );
};