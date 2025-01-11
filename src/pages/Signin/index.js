import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    signin(email, senha)
      .then((res) => {
        if (res) {
          // Se `res` contém uma mensagem de erro, define no estado de erro
          setError(res);
        } else {
          // Caso contrário, navega para a página de sucesso
          navigate("/home");
        }
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Entrar
        </Button>

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
