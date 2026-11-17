import { COLORS } from "../../styles/colors";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Box } from "@mui/material";

export function PageApp({ children, navbar=true, footer=true }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        background: COLORS.verdeClaro
      }}
    >
      {navbar && <Navbar />}
        <Box 
          sx={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column" 
          }}
        > 
         {children} 
        </Box>
      {footer && <Footer />}
    </Box>
  )
}