import { PageHero } from "./PageHero.jsx";
import { Box } from "@mui/material";

/**
 * TableContainer2 — layout de página com tabela
 *
 * Props:
 *  - title: string
 *  - children: ReactNode
*/

export const TableContainer = ({ title, children, action }) => {
  return (
    <Box>
      {title && <PageHero title={title} action={action} />}
      <Box
        sx={{
          flex: 1,
          px: 1.5,
          py: 1.5,
          mx: "auto",
          width: "100%",
          maxWidth: "1700px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};