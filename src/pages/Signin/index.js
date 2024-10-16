import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault()
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
      })
      
  };
  
  
  

  return (
    <C.Container>
      <img src="favicon.png" alt="Descrição da imagem" style={{ width: '300px', marginBottom: '20px' }} />
      
     {/*  <C.Label>Doc Filler</C.Label>*/}
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
      {/*  <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup> */}
      </C.Content>
    </C.Container>
  );
};

export default Signin;
