import { Box } from "@mui/material";
import { Dashboard } from "./components/Dashboard.jsx";
import { ActionCards } from "./components/ActionCards.jsx";
import { PageHero } from "../../../components/layout/PageHero.jsx";

export const OpcoesAdministrador = () => {
  return (
    <Box>
      <PageHero title="SUPORTE"/>
      <Box
        sx={{
          mt: 3,
          mb: 1,
          px: 2,
          gap: 4,
          flex: 1,
          mx: "auto",
          width: "100%",
          display: "flex",
          maxWidth: "1300px",
          flexDirection: "column",
        }}
      >
        <ActionCards />
        <Dashboard />
      </Box> 
    </Box>
  );
};