import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const PedidoApi = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API;


    const createPedido = async (pedido) => {


    };

    const getPedidos = async () => {
    
        const response = await fetch(`${api_url}/intellicatalog/v1/orders/user/${user.userId}`, {
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
          throw new Error("Erro ao buscar pedidos");
        }
    
        return await response.json();
      }

      const deletarPedido = async (id) =>{
        const response = await fetch(`${api_url}/intellicatalog/v1/orders/${id}`, {
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
          throw new Error("Erro ao deletar pedido");
        }
    
        return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
    
      }

    return {
        createPedido,
        getPedidos,
        deletarPedido
    };
}

export default PedidoApi;

