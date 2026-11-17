import { Box, Typography } from "@mui/material";

/**
 * PageHero — seção hero verde reutilizável
 *
 * Props:
 *  - title: string
 *  - greeting: string | null  (default null — sem saudação)
*/

export const PageHero = ({ title, greeting=null, action=null }) => {
  return (
    <Box
      sx={{
        pt: 1,
        mb: 2,
        pb: "25px",
        position: "relative",
        textAlign: "center",
        bgcolor: "#207420",
        //background: "linear-gradient(135deg, #3AAF50 0%, #2D8F40 100%)",
      }}
    >
      {greeting && (
        <Typography
          fontSize={14}
          //fontFamily='"Poppins", sans-serif'
          sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}
        >
          {greeting}
        </Typography>
      )}

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          fontSize={30}
          fontWeight={800}
          //fontFamily='"Poppins", sans-serif'
          sx={{ color: "#FFF" }}
        >
          {title}
        </Typography>

        {action && (
          <Box sx={{ position: "absolute", right: 1050 }}>
            {action}
          </Box>
        )}
      </Box>
    </Box>
  );
};