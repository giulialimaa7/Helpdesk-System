import servidor from "../../hooks/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children } ) => {
  const navigate = useNavigate();
  
  const [ loading, setLoading ] = useState(true);
  const [ token, setToken ] = useState("");
  const [ nome, setNome ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ permissao, setPermissao ] = useState(null);
  
  const handleLogout = () => {
    setToken("");
    setNome("");
    setEmail("");
    setPermissao(null);
    
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("email");
    localStorage.removeItem("permissao");
    
    navigate("/");
  };

  const api = servidor(handleLogout);

  const validateToken = async () => {
    setLoading(true);

    const storageData = localStorage.getItem("token");

    if (storageData) {
      try {
        const data = await api.validateToken(storageData);

        if (data.isValid) {
          setToken(storageData);

          const storedEmail = localStorage.getItem("email");
          const storedPermissao = localStorage.getItem("permissao");

          setEmail(storedEmail);
          setPermissao(storedPermissao);
        } 
        else {
          handleLogout();
        }
      } 
      catch (error) {
        console.error("Token validation error:", error);
        
        handleLogout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    validateToken();
  }, []);


  const handleLogin = async (email, password) => {
    try {
      const data = await api.loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("nome", data.user.nome);
        localStorage.setItem("permissao", data.user.permissao);

        setToken(data.token);
        setNome(data.user.nome);
        setEmail(data.user.email);
        setPermissao(data.user.permissao);
        //✅sucesso
        return true; 
      }
      //⚠️login sem token
      return false; 
    } 
    catch (error) {
      alert("Erro ao fazer login. Tente novamente!");
      //❌erro de rede ou credencial
      return false; 
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,

        loading,
        token,
        permissao,
        email,

        isAuthenticated: !!token,
      }}
    > { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);