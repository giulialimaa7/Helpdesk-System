import { COLORS } from "./colors.js";
import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },

  components: {
    //BUTTON
    MuiButton: {
      variants: [
        {
          //BOTÃO VERDE (primário)
          props: { variant: "primary" },
          style: {
            color: COLORS.branco,
            marginTop: "1rem",
            boxShadow: `0 4px 12px ${COLORS.sombraVerde}`,
            background: `linear-gradient(135deg, ${COLORS.verde} 0%, ${COLORS.verdeEscuro} 100%)`,

            "&:hover": {
              boxShadow: `0 6px 18px ${COLORS.sombraVerde}`,
              background: `linear-gradient(135deg, ${COLORS.verdeEscuro} 0%, ${COLORS.verdeHover} 100%)`,
            },

            "&:active": {
              transform: "scale(0.97)",
            },

            "&.Mui-disabled": {
              color: COLORS.branco,
              boxShadow: "none",
              background: COLORS.verdeDisable,
            },
          },
        },

        {
          //BOTÃO OUTLINE VERDE (secundário)
          props: { variant: "secondary" },
          style: {
            marginTop: "1rem",
            color: COLORS.verde,
            background: "transparent",
            border: `1.5px solid ${COLORS.verde}`,

            "&:hover": {
              color: COLORS.verdeEscuro,
              background: COLORS.verdeClaro,
              borderColor: COLORS.verdeEscuro,
            },

            "&:active": {
              transform: "scale(0.97)",
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: 0.3,
          borderRadius: "8px",
          fontSize: "0.875rem",
          textTransform: "none",
          padding: "0.65rem 1.25rem",
          transition: "all 0.2s ease",

          "&:active": {
            transform: "scale(0.97)",
          },
        },
      },
    },

    //TEXTFIELD 
    MuiTextField: {
      defaultProps: {
        //size: "small",
        fullWidth: true,
        variant: "outlined",
        
        style: {
          marginTop: "0rem",
        },
      },

      styleOverrides: {
        root: {
          //label padrão
          "& label": {
            fontSize: "0.875rem",
          },

          //label focado — verde
          "& label.Mui-focused": {
            color: COLORS.verde,
            fontWeight: 600,
          },

          //input e textarea
          "& input, & textarea": {
            fontSize: "0.875rem",
          },

          //borda padrão
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",

            "& input": {
              padding: "14px 14px", //aumenta a altura — padrão era ~10px
            },

            "&:hover fieldset": {
              borderColor: COLORS.verde,
            },

            "&.Mui-focused fieldset": {
              borderColor: COLORS.verde,
            },
          },

          //outlined disabled
          "& .MuiOutlinedInput-root.Mui-disabled": {
            backgroundColor: COLORS.cinzaClaro,

            "& fieldset": {
              borderColor: COLORS.cinzaBorda,
            },
          },

          "& .MuiOutlinedInput-root.Mui-disabled input, & .MuiOutlinedInput-root.Mui-disabled textarea": {
            color: COLORS.cinzaTexto,
            WebkitTextFillColor: COLORS.cinzaTexto,
          },

          "& label.Mui-disabled": {
            color: COLORS.textoBorda,
          },

          //filled variant
          "& .MuiFilledInput-root": {
            borderRadius: "8px 8px 0 0",

            "&:hover": {
              backgroundColor: COLORS.fundoFilledHover,
            },

            "&.Mui-focused": {
              backgroundColor: COLORS.fundoFilledHover,
            },

            "&::after": {
              borderBottomColor: COLORS.verde,
            },
          },
        },
      },
    },

    //SELECT
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "0.875rem",

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: COLORS.verde,
          },
        },

        select: {
          paddingTop: "13px",
          fontSize: "0.875rem",
          paddingBottom: "13px",
        }
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",

          "&:hover": {
            backgroundColor: COLORS.verdeClaro,
          },

          "&.Mui-selected": {
            backgroundColor: COLORS.fundoFilledHover,

            "&:hover": {
              backgroundColor: "#D4EDDA",
            },
          },
        },
      },
    },

  },
});