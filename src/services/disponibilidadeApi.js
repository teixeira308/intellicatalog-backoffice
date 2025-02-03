import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const DisponibilidadeApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

  const getAvailability = async () => {
    const response = await fetch(`${api_url}/intellicatalog/v1/availability`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }
    if (!response.ok) {
      throw new Error("Erro ao buscar disponibilidade");
    }

    return await response.json();
  }

  return {
    getAvailability,

  };
}

export default DisponibilidadeApi;