import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import UserApi from "../../services/userApi";
import { useNavigate } from "react-router-dom"; // Para navegação
import { FaArrowLeft } from "react-icons/fa"; // Ícone de seta para voltar

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Estado para o loading
  const { requestReset } = UserApi();
  const navigate = useNavigate(); // Hook para navegação

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Por favor, insira seu e-mail.");
      return;
    }

    setLoading(true); // Ativa o estado de loading
    setError("");
    setSuccess("");

    try {
      const response = await requestReset(email);
      setSuccess(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Desativa o estado de loading
    }
  };

  return (
    <C.Container>
       <C.BackButton onClick={() => navigate(-1)}> 
        <FaArrowLeft size={20} />
        <span>  Voltar</span>
      </C.BackButton>
      <img
        src="favicon.png"
        alt="Descrição da imagem"
        style={{ width: "300px", marginBottom: "20px", borderRadius: "20px" }}
      />
      <C.Content>
        <C.Subtitle>Esqueci minha senha</C.Subtitle>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        {error && <C.LabelError>{error}</C.LabelError>}
        {success && <p>{success}</p>}
        {loading ? (
          <img
            src="/loading.gif" // Substitua pelo caminho da sua imagem de loading
            alt="Carregando..."
            style={{ width: "50px", margin: "20px auto" }}
          />
        ):(
          <C.LabelForgot>
          <Button Text="Enviar" onClick={handleForgotPassword} disabled={loading} />
        </C.LabelForgot>

        )}
      </C.Content>
    </C.Container>
  );
};

export default EsqueciSenha;
