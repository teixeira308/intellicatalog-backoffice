import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const ServicesApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

  const getServicesByUser = async () => {
    try {
      const response = await fetch(`${api_url}/intellicatalog/v1/services?user=${user.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
  
      if (response.status === 401) {
        navigate('/login'); // Redireciona para o login
        return; // Para evitar execução posterior
      }
  
      if (!response.ok) {
        throw new Error(`Erro ao buscar serviços: ${response.status}`);
      }
  
      const data = await response.json(); // Garante que o JSON seja obtido
      console.log("Resposta da API: ", data); // Verifique o formato retornado aqui
      return data; // Retorna os dados diretamente
    } catch (error) {
      console.error("Erro na requisição getServicesByUser:", error.message);
      throw error; // Repropaga o erro para lidar adequadamente
    }
  };
  

  const deleteServices = async (servico) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/services/${servico.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      throw new Error("Erro ao deletar serviço");
    }

    return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.

  }


  const createServices = async (servico) => {
    console.log("entrou na chamada")
   
    const response = await fetch(`${api_url}/intellicatalog/v1/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(servico),
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar serviço");
    }

    return await response.json();
  }

  const updateService = async(servicoId,servico) =>{

    const response = await fetch(`${api_url}/intellicatalog/v1/services/${servicoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(servico),
    });
  
    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
  }
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar serviços");
    }
  
    return await response.json();

  }

  const updateServiceStatus = async (servicoId, updatedServico) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/services/${servicoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(updatedServico),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar o status do serviço");
    }
  };
  
  
  const updateServiceOrder = async (servicos) => {
    // Estrutura do JSON esperado pelo backend
    const payload = {
      servicos: servicos.map((servico, index) => ({
        id: servico.id,          // ID do serviço
        service_order: index + 1, // Nova ordem (dependendo se começa com 1 ou 0)
      })),
    };
  
    const response = await fetch(`${api_url}/intellicatalog/v1/services/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar serviços");
    }
  
    return await response.json();
  };
  


  return {
    getServicesByUser,
    deleteServices,
    createServices,
    updateService,
    updateServiceOrder,
    updateServiceStatus
   
  };
}

export default ServicesApi;