import BuildIcon from "@mui/icons-material/Build";
//import LaptopIcon from "@mui/icons-material/Laptop";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../styles/colors.js";
import { Box } from "@mui/material";
import { PageHero } from "../components/layout/PageHero";
import { MenuCard } from "../components/ui/MenuCard";
import { useAuth } from "../context/Auth/AuthProvider";

export const Home = () => {
  const navigate = useNavigate();

  const { permissao } = useAuth();
  const permissaoNum = parseInt(permissao, 10);

  const linkSuporteRoute =
    permissaoNum === 1 ? "/suporte/colaboradores" : "/suporte/administrador"
  ;

  const menuItems = [
    {
      label: "SUPORTE",
      icon: <BuildIcon sx={{ fontSize: 52, color: COLORS.verde }} />,
      route: linkSuporteRoute,
      delay: "0.1s",
    },
    // ...(permissaoNum !==1 ? [
    //   {
    //     label: "PATRIMÔNIOS",
    //     icon: <LaptopIcon sx={{ fontSize: 52, color: COLORS.verde }} />,
    //     route: "/patrimonios",
    //     delay: "0.22s",
    //   },
    // ] : []), 
  ];

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageHero
        greeting="Oi, que bom ter você de volta! 👋"
        title="O QUE VOCÊ PRECISA HOJE?"
      />

      {/* CARDS */}
      <Box
        sx={{
          py: 6,
          px: 3,
          flex: 1,
          gap: 3.5,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {menuItems.map((item) => (
          <MenuCard
            key={item.label}
            label={item.label}
            icon={item.icon}
            delay={item.delay}
            onClick={() => navigate(item.route)}
          />
        ))}
      </Box>
    </Box>
  );
};
