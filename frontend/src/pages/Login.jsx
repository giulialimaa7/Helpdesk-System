import bgimgLogin from "../assets/imgs/bgimgLogin.png";
import logoLogin from "../assets/imgs/logoLogin.png";
import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { COLORS } from "../styles/colors.js";
import { useAuth } from "../context/Auth/AuthProvider.jsx";
import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Link,
  Typography,
  CircularProgress,
  Alert,
  Collapse
} from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, handleLogout, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("error");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    
  }, [isAuthenticated, navigate]);

  const showError = (message, type="error") => {
    setError(message);
    setSeverity(type);

    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!email || !password) 
      return showError("Preencha todos os campos!", "warning")
    ;

    setIsLoading(true);
    const success = await handleLogin(email, password);
    //setIsLoading(false);

    if (success) 
      navigate("/home")
    ;
    
    else {
      setIsLoading(false);
      showError("Email ou senha incorretos!", "error");
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
          backgroundImage: `url(${ bgimgLogin })`,
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
            fontSize={50} 
            fontWeight={700}
          >
            LOGIN
          </Typography>
          <Typography
            mb={6}
            fontSize={14}
            lineHeight={1.6}
            color={COLORS.texto1}
          >
            Seja bem vindo! Por favor, entre em sua conta.
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
              label="Email"
              value={email}
              placeholder="usuario@empresa.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <TextField
              label="Senha"
              type="password"
              value={password}
              placeholder="********"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </Box>

          <Box
            mb={3}
            mt={1.5}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel
              control={
                <Switch
                  color="success"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Lembrar de mim"
              sx={{ "& .MuiTypography-root": { fontSize: 13 } }}
            />

            <Link
              fontSize={12}
              underline="hover"
              to="/esqueci-senha"
              color="text.secondary"
              component={RouterLink}
            >
              Esqueceu sua senha?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="primary"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {
              isLoading ? 
              <CircularProgress size={24} color="inherit" /> 
              : "ENTRAR"
            }
          </Button>

          <Box mt={10} textAlign="center">
            <img src={logoLogin} width={100} />
          </Box>

        </Box>
      </Box>
    </Box>
  );
};