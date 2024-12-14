import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import UserApi from "../../services/userApi";
import loadingGif from '../../components/loading.gif';

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { requestReset } = UserApi();
  const [loading, setLoading] = useState(false); // Estado para o loading

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Por favor, insira seu e-mail.");
      return;
    }

    try {
      const response = await requestReset(email);
      setSuccess(response.message);
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <C.Container>
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
        {error && <C.labelError>{error}</C.labelError>}
        {success && <p>{success}</p>}
        {loading && (
         <C.LoadingImage src={loadingGif} alt="Carregando..." />
        )}
        <C.LabelForgot>
          
            <Button Text="Enviar" onClick={handleForgotPassword} />
          
        </C.LabelForgot>
      </C.Content>
    </C.Container>
  );
};

export default EsqueciSenha;
