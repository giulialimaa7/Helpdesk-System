import bgimgLogin from "../assets/imgs/bgimgLogin.png";
import logoLogin from "../assets/imgs/logoLogin.png";
import LoginIcon from '@mui/icons-material/Login';
import servidor from "../hooks/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../styles/colors.js";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Collapse,
} from "@mui/material";

export const EsqueciSenha = () => {
  const api = servidor();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("error");

  const showError = (message, type = "error") => {
    setError(message);
    setSeverity(type);

    setTimeout(() => setError(""), 3000);
  };

  const handleSubmit = async () => {
    if (!email) 
      return showError("Preencha o campo de email!", "warning")
    ;
    
    try {
      setIsLoading(true);
      const success = await api.requestPassword(email);

      if (!success) {
        showError("Não foi possível processar sua solicitação!", "error");
        setIsLoading(false);
        return;
      }
      showError(
        "Verifique a caixa de entrada do seu email para redefinir sua senha!",
        "success"
      );
      
      setEmail("");
      setIsLoading(false);

      setTimeout(() => {
        setError("");
        navigate("/");
      }, 4000);
    } 
    catch (error) {
      console.error(error);
      showError("Erro ao processar solicitação. Tente novamente!", "error");
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* LADO ESQUERDO */}
      <Box
        flex={1}
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${bgimgLogin})`,
        }}
      />
      {/* LADO DIREITO */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        bgcolor={COLORS.branco}
        justifyContent="center"
      >
        <Box width="410px">
          <Typography 
            mb={1} 
            fontSize={40} 
            fontWeight={700}
          >
            ESQUECI A SENHA
          </Typography>
          <Typography
            mb={6}
            fontSize={14}
            lineHeight={1.6}
            color={COLORS.texto1}
          >
            Digite o endereço de email da sua conta e 
            lhe enviaremos um link para redefinir sua senha.
          </Typography>

          <Collapse in={Boolean(error)}>
            <Alert 
              severity={severity} 
              variant="filled" 
              sx={{ mb: 4 }}
            >
              {error}
            </Alert>
          </Collapse>

          <Box 
            gap={2} 
            display="flex" 
            flexDirection="column" 
          >
            <TextField
              required
              type="email"
              label="Email"
              placeholder="usuario@empresa.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </Box>

          <Box 
            mt={1}
            gap={2}
            display="flex" 
          >
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
            >
              <LoginIcon/>
            </Button>
            <Button
              fullWidth
              variant="primary"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? <CircularProgress size={24} color="inherit"/> : "ENVIAR"}
            </Button>
          </Box>

          <Box mt={10} textAlign="center">
            <img src={logoLogin} width={100} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};