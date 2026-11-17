import { COLORS } from "../../styles/colors";
import { Box, Typography, Divider } from "@mui/material";

/**
 * SectionTitle2 — título de seção com acento verde
 * Substitui o Divider com texto do original
 *
 * Props:
 *  - title: string
 *  - mt: number (margin top, default 0)
*/

export const SectionTitle = ({ title }) => {
  return (
    <Box 
      sx={{ 
        gap: 2, 
        display: "flex", 
        alignItems: "center", 
      }}
    
    >
      <Typography
        fontSize={18}
        fontWeight={700}
        letterSpacing={0.3}
        color={COLORS.texto1}
      >
        {title}
      </Typography>
      
      <Divider sx={{ flex: 1, borderColor: COLORS.verdeBorda }} />
    </Box>
  );
};
