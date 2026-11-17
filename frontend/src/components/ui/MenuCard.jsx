import { Box, Typography } from "@mui/material";
import { COLORS } from "../../styles/colors";

/**
 * MenuCard — card de navegação reutilizável
 *
 * Props:
 *  - label: string (ex: "SUPORTE")
 *  - icon: ReactNode (ex: <BuildIcon />)
 *  - onClick: () => void
 *  - delay: string (ex: "0.1s") —> delay da animação de entrada
*/

export const MenuCard = ({ label, icon, onClick, delay="0s" }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        gap: 1.5,
        width: 250,
        height: 270,
        display: "flex",
        cursor: "pointer",
        overflow: "hidden",
        alignItems: "center",
        borderRadius: "20px",
        position: "relative",
        animationDelay: delay,
        animationName: "fadeUp",
        flexDirection: "column",
        justifyContent: "center",
        animationFillMode: "both",
        background: COLORS.branco,
        animationDuration: "0.5s",
        animationTimingFunction: "ease",
        border: `1.5px solid ${COLORS.verdeBorda}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
        
        "&:hover": {
          borderColor: COLORS.verde,
          transform: "translateY(-6px)",
          bboxShadow: "0 20px 48px #3AAF502E"
        },
      }}
    >
      {/* BARRA DE ACENTO VERDE */}
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          position: "absolute",
          borderRadius: "20px 20px 0 0",
          background: `linear-gradient(90deg, ${COLORS.verde}, ${COLORS.verdeEscuro})`,
        }}
      />

      {/* ÍCONE */}
      <Box
        sx={{
          width: 85,
          height: 85,
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.verdeClaro,
        }}
      >
        {icon}
      </Box>

      {/* LABEL */}
      <Typography
        fontSize={14}
        fontWeight={700}
        letterSpacing={1.2}
        color={COLORS.texto1}
      >
        {label}
      </Typography>

      {/* SETA */}
      <Typography 
        fontSize={20} 
        fontWeight={700} 
        color={COLORS.verde}
      >
        →
      </Typography>
    </Box>
  );
};
