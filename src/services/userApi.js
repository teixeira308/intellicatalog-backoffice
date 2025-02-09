import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const UserApi = () => {
  const { user } = useContext(AuthContext); // Para capturar o usuário autenticado, se necessário
  const navigate = useNavigate();
  //const api_url = process.env.REACT_APP_API;
  const api_url = 'http://localhost/api'

  const updatePassword = async (token, newPassword) => {
    try {
      const response = await fetch(`${api_url}/intellicatalog/v1/users/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao redefinir a senha");
      }

      const data = await response.json();
      return data; // Retorna a resposta da API
    } catch (err) {
      throw err.message || "Erro ao redefinir a senha";
    }
  };

  const requestReset = async (email) => {
    try {
      const response = await fetch(`${api_url}/intellicatalog/v1/users/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || "Erro ao enviar e-mail de redefinição.");
      }

      return { message: "E-mail enviado com sucesso." }; // Resposta em caso de sucesso
    } catch (err) {
      throw new Error(err.message || "Erro ao conectar com o servidor.");
    }
  };

  
  return {
    updatePassword, requestReset
  };
};

export default UserApi;
