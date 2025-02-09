import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const AgendamentoApis = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;
    //const api_url = 'http://localhost/api'


  const createAppointment = async (appointment) => {

    const appointmentComUserId = {
        ...appointment,
        user_id: user.userId, // Pega o user_id do objeto `user`
      };

      
    const response = await fetch(`${api_url}/intellicatalog/v1/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(appointmentComUserId),
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar agendamento");
    }

    return await response.json();

  }

  const getAppoointment = async() =>
  {
    const response = await fetch(`${api_url}/intellicatalog/v1/appointments`, {
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

  const getAppointmentByAvaliability = async(avaliability_id) =>
    {
      const response = await fetch(`${api_url}/intellicatalog/v1/appointments/availability/${avaliability_id}`, {
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
    createAppointment,
    getAppoointment,
    getAppointmentByAvaliability

  };
}

export default AgendamentoApis;