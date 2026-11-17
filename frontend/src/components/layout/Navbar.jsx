import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../styles/colors";
import { useAuth } from "../../context/Auth/AuthProvider.jsx";
import { AppBar, Toolbar, Typography, Button, Box, Tooltip } from "@mui/material";

/**
 * Navbar — barra superior
 *
 * Props:
 *  - title: string (opcional)
 *  - showBack: boolean (opcional, default true)
*/

export const Navbar = ({ title="Helpdesk", showBack=true }) => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: COLORS.verdeHeader,
        boxShadow: `0 2px 12px ${COLORS.verdeHeader}`,
      }}
    >
      <Toolbar 
        sx={{ 
          mt: 0.5,
          px: { xs: 2, sm: 4 },
          justifyContent: "space-between", 
        }}
      >
        {/* ESQUERDA: seta voltar + título */}
        <Box 
          sx={{ 
            gap: 1.5, 
            display: "flex", 
            alignItems: "center", 
          }}
        >
          {showBack && (
            <Tooltip title="Voltar para página anterior">
              <Box
                onClick={() => navigate(-1)}
                sx={{
                  width: 34,
                  height: 34,
                  display: "flex",
                  cursor: "pointer",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                  background: "rgba(255,255,255,0.15)",
                  "&:hover": { background: "rgba(255,255,255,0.25)" },
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 18, color: COLORS.branco }} />
              </Box>
            </Tooltip>
          )}

          <Typography
            fontSize={17}
            fontWeight={700}
            letterSpacing={0.5}
            color={COLORS.branco}
          >
            {title}
          </Typography>
        </Box>

        {/* BOTÃO SAIR */}
        <Tooltip title="Sair do sistema">
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon sx={{ fontSize: 17 }} />}
            sx={{
              px: 2,
              py: 1,
              fontSize: 13,
              borderRadius: 2,
              color: COLORS.branco,
              textTransform: "none",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.22)",
              
              "&:hover": { background: "rgba(255,255,255,0.18)" },
            }}
          >
            SAIR
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};