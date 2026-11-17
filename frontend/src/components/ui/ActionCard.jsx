import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { COLORS } from "../../styles/colors";
import { Box, Typography } from "@mui/material";

/**
 * ActionCard — card de ação reutilizável
 *
 * Props:
 *  - icon: string (caminho da imagem) ou ReactNode
 *  - title: string
 *  - description: string
 *  - onClick: () => void
*/

export const ActionCard = ({ icon, title, description, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2.5,
        gap: 2.5,
        display: "flex",
        borderRadius: 3,
        cursor: "pointer",
        alignItems: "center",
        background: COLORS.branco,
        border: `1.5px solid ${COLORS.verdeBorda}`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

        "&:hover": {
          borderColor: COLORS.verde,
          transform: "translateY(-3px)",
          boxShadow: "0 12px 32px #3AAF5026",

          "& .action-arrow": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      }}
    >
      {/* ÍCONE */}
      <Box
        sx={{
          width: 56,
          height: 56,
          flexShrink: 0,
          display: "flex",
          borderRadius: 2.5,
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px #3AAF504D",
          background: `linear-gradient(135deg, ${COLORS.verde} 0%, ${COLORS.verdeEscuro} 100%)`,
        }}
      >
        {typeof icon === "string" ? (
          <Box
            src={icon}
            alt={title}
            component="img"

            sx={{ 
              width: 28, 
              height: 28, 
              filter: "brightness(0) invert(1)" 
            }}
          />
        ) : (
          <Box sx={{ color: COLORS.branco, display: "flex" }}> 
            {icon} 
          </Box>
        )}
      </Box>

      {/* TEXTO */}
      <Box sx={{ flex: 1 }}>
        <Typography
          fontSize={15}
          fontWeight={700}
          letterSpacing={0.8}
          color={COLORS.texto1}
        >
          {title}
        </Typography>

        <Typography
          mt={0.25}
          fontSize={12}
          fontWeight={500}
          color={COLORS.textoLabel}
        >
          {description}
        </Typography>
      </Box>

      {/* SETA */}
      <ArrowForwardIcon
        className="action-arrow"
        sx={{
          opacity: 0,
          fontSize: 18,
          color: COLORS.verde,
          transform: "translateX(-4px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}
      />
    </Box>
  );
};