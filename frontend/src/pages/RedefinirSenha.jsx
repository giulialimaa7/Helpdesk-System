import bgimgLogin from "../assets/imgs/bgimgLogin.png";
import logoLogin from "../assets/imgs/logoLogin.png";
import servidor from "../hooks/api.js";
import LoginIcon from '@mui/icons-material/Login';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { COLORS } from "../styles/colors.js";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Collapse,
  Backdrop,
} from "@mui/material";

export const RedefinirSenha = () => {
  const api = servidor();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("error");

  const showError = (message, type = "error") => {
    setError(message);
    setSeverity(type);
    setTimeout(() => setError(""), 3000);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get("token");

    if (!tokenFromUrl) {
      setIsVerifying(false);
      return;
    }

    setToken(tokenFromUrl);

    const checkToken = async () => {
      try {
        await api.validateResetToken(tokenFromUrl);
        setIsTokenValid(true);
      } 
      catch (error) {
        console.error(error);
        setIsTokenValid(false);
      } 
      finally {
        setIsVerifying(false);
      }
    };
    checkToken();
  }, [location, navigate]);

  const handleSubmit = async () => {
    if (password.length < 6) {
      return showError(
        "A senha deve ter pelo menos 6 caracteres.", 
        "warning"
      );
    }
    if (password !== confirmPassword) {
      return showError("As senhas não coincidem!", "warning");
    }
    try {
      setIsLoading(true);
      const success = await api.resetPassword(token, password);

      if (!success) {
        showError("Não foi possível redefinir sua senha!", "error");
        setIsLoading(false);
        return;
      }

      showError("Senha redefinida com sucesso!", "success");

      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);

      setTimeout(() => {
        setError("");
        navigate("/");
      }, 4000);
    } 
    catch (error) {
      console.error(error);

      showError("Erro ao redefinir senha. Tente novamente!", "error");
      setIsLoading(false);
    }
  };

  // BACKDROP — verificando token
  if (isVerifying) {
    return (
      <Backdrop 
        open 
        sx={{ 
          gap: 2, 
          flexDirection: "column", 
          backgroundColor: COLORS.branco
        }}
      >
        <CircularProgress sx={{ color: COLORS.verde}} size={48} />
        <Typography 
          fontSize={16} 
          fontWeight={600} 
          color={COLORS.texto1}
        >
          Verificando token de redefinição...
        </Typography>
      </Backdrop>
    );
  }

  // BACKDROP — token inválido
  if (!isTokenValid) {
    return (
      <Backdrop 
        open 
        sx={{ 
          gap: 2.5, 
          flexDirection: "column", 
          backgroundColor: COLORS.branco 
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 70, color: COLORS.vermelho }} />
        <Typography 
          fontSize={20} 
          fontWeight={700} 
          color={COLORS.texto1}
        >
          TOKEN INVÁLIDO OU EXPIRADO
        </Typography>
        <Typography 
          fontSize={16} 
          maxWidth={450}
          color={COLORS.texto1}
          textAlign="center" 
        >
          Solicite uma nova redefinição de senha para continuar.
        </Typography>

        <Button
          variant="primary"
          onClick={() => navigate("/esqueci-senha")}
        >
          SOLICITAR NOVAMENTE
        </Button>
      </Backdrop>
    );
  }

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
        justifyContent="center"
        bgcolor={COLORS.branco}
      >
        <Box width="400px">
          <Typography 
            mb={1} 
            fontSize={40} 
            fontWeight={700}
          >
            REDEFINIR SENHA
          </Typography>
          <Typography 
            mb={6} 
            fontSize={14}
            lineHeight={1.6}
            color={COLORS.texto1}
          >
            Digite sua nova senha abaixo.
          </Typography>
          
          <Collapse in={Boolean(error)}>
            <Alert 
              severity={severity} 
              variant="filled" 
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          </Collapse> 

          <Box 
            mt={2}
            gap={2} 
            display="flex" 
            flexDirection="column" 
          >
            <TextField
              required
              type="password"
              label="Nova senha"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <TextField
              required
              type="password"
              label="Confirmar senha"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "REDEFINIR"}
            </Button>
          </Box>

          <Box mt={8} textAlign="center">
            <img src={logoLogin} width={100} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};