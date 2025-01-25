import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const PedidoApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

 

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

  const deletarPedido = async (pedido) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/orders/${pedido.id}`, {
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

  const updatePedido = async (id,pedido) => {

    const response = await fetch(`${api_url}/intellicatalog/v1/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(pedido),
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar pedido");
    }

    return await response.json();

  }

  const deletarItemPedido = async (pedido,item) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/orders/${pedido.id}/item/${item.id}`, {
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

  const createPedido = async (pedido) =>{
    const pedidoComUserId = {
      ...pedido,
      user_id: user.userId, // Pega o user_id do objeto `user`
      
    };
    console.log(pedidoComUserId);
    const response = await fetch(`${api_url}/intellicatalog/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(pedidoComUserId),
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar pedido");
    }

    return await response.json();
  }

  const addItemPedido = async (item,pedido) =>{
    console.log("entrou")

    console.log(pedido," - ",{'item':item});
    console.log(user?.token)
    const response = await fetch(`${api_url}/intellicatalog/v1/orders/${pedido}/items`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: {'items':item},
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar pedido");
    }

    return await response.json();
  }


  return {
    createPedido,
    getPedidos,
    deletarPedido,
    updatePedido,
    deletarItemPedido,
    addItemPedido
  };
}

export default PedidoApi;

