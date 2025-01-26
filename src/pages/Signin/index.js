import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
import loadingGif from "../../components/loading.gif"
import * as C from "./styles";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }
    setIsLoading(true); // Ativa o estado de carregamento
    signin(email, senha)
    .then((res) => {
      setIsLoading(false); // Desativa o estado de carregamento após a resposta
      if (res) {
        setError(res); // Define a mensagem de erro, se houver
      } else {
        navigate("/home"); // Redireciona em caso de sucesso
      }
    })
    .catch(() => {
      setIsLoading(false); // Garante que o estado de carregamento seja desativado
      setError("Ocorreu um erro inesperado. Tente novamente.");
    });
};

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f4f4f4"
      p={2}
    >
      {/* Logo */}
      <img
        src={logo}
        alt="Descrição da imagem"
        style={{ width: "300px", marginBottom: "20px", borderRadius: "20px" }}
      />

      <Box
        component="form"
        onSubmit={handleLogin}
        width="100%"
        maxWidth="400px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="white"
        boxShadow={3}
        p={4}
        borderRadius={2}
      >
        {/* Campo de E-mail */}
        <TextField
          fullWidth
          label="E-mail"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        {/* Campo de Senha */}
        <TextField
          fullWidth
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError("");
          }}
        />

        {/* Erro */}
        {error && (
          <Typography color="error" variant="body2" style={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}

        {/* Botão de Entrar */}
       
        {isLoading ? (
            <C.LoadingImage src={loadingGif} alt="Carregando..." />
          ) : (
           <>
            <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Entrar
        </Button>
           </>
          )}

        {/* Link para Esqueceu a Senha */}
        <Typography variant="body2" style={{ marginTop: "20px" }}>
          Esqueceu sua senha?{" "}
          <Button
            variant="text"
            color="action"
            onClick={() => navigate("/esquecisenha")}
            style={{ textTransform: "none" }}
          >
            Clique aqui
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signin;
