import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const ProductApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/intellicatalog/v1/products", {
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
      throw new Error("Erro ao buscar productos");
    }

    return await response.json();
  }

  const deleteProduto = async (produto) => {
    const response = await fetch(`http://localhost:3000/intellicatalog/v1/products/${produto.id}`, {
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
      throw new Error("Erro ao deletar categoria");
    }

    return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.

  }


  const createProduto = async (produto,categoriaId) => {

    const produtoComUserId = {
      ...produto,
      user_id: user.userId, // Pega o user_id do objeto `user`
      category_id: categoriaId
    };
   
    const response = await fetch(`http://localhost:3000/intellicatalog/v1/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(produtoComUserId),
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar categoria");
    }

    return await response.json();
  }

  const updateProduto = async(id,produto) =>{

    const response = await fetch(`http://localhost:3000/intellicatalog/v1/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(produto),
    });
  
    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
  }
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar produto");
    }
  
    return await response.json();

  }

  const changeProductStatus = async(productId, status) => {
    console.log(productId)
    const newStatus = { "status": status ? "ativo" : "inativo" }
    const response = await fetch(`http://localhost:3000/intellicatalog/v1/products/${productId}`, {
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
      throw new Error(errorData.message || "Erro ao atualizar produto");
    }
  
    return await response.json();

  }

  return {
    getProducts,
    deleteProduto,
    createProduto,
    updateProduto,
    changeProductStatus
  };
}

export default ProductApi;