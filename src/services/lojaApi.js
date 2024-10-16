import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const LojaApi = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const getStores = async () => {
        const response = await fetch("http://localhost:3000/intellicatalog/v1/stores/", {
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
          throw new Error("Erro ao buscar pessoas");
        }
    
        return await response.json();
      };

      const changeStatus = async (id, isOpen) => {
       
      const newStatus = {"status": isOpen ? "Aberta":"Fechada"}
      
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/stores/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(newStatus),
        });
      
        if (response.status === 401) {
          // Redireciona para a tela de login
          navigate('/login');
      }
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao atualizar status store");
        }
      
        return await response.json();
      }

      
      const updateLoja = async (id, loja) => {
        
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/stores/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(loja),
        });
        if (response.status === 401) {
          // Redireciona para a tela de login
          navigate('/login');
      }
      
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao atualizar status store");
        }
      
        return await response.json();
      }
      
      return {
        getStores,
        changeStatus,
        updateLoja
      };
}

export default LojaApi;