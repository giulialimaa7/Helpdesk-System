import { Box, Typography } from "@mui/material";
import { COLORS } from "../../styles/colors";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        textAlign: "center",
        background: COLORS.branco,
        borderTop: `1px solid ${COLORS.verdeBorda}`,
      }}
    >
      <Typography
        fontSize={12}
        fontWeight={500}
        color={COLORS.texto2}
      >
        © {new Date().getFullYear()} Helpdesk System
      </Typography>
    </Box>
  );
};
