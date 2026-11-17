import { COLORS } from "../../styles/colors.js";
import { PageHero } from "./PageHero.jsx";
import { Box, Paper } from "@mui/material";

/**
 * PageForm — layout de página com formulário centralizado
 *
 * Props:
 *  - title: string (título do formulário)
 *  - children: ReactNode
*/

export const PageForm = ({ title, children, mt, maxWidth="1400px" }) => {
  return (
    <Box>
      <PageHero title={title}/>
      <Box
        sx={{
          px: 2,
          mt: mt,
          //mb: 2,
          py: 1.5,
          flex: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* CONTEÚDO */}
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            borderRadius: 3,
            maxWidth: maxWidth,
            p: { xs: 3, sm: 4 },
            background: COLORS.branco,
            border: `1.5px solid ${COLORS.verdeBorda}`,
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};