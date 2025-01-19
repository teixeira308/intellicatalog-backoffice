import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const ProductApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

  const getProducts = async () => {
    
    const response = await fetch(`${api_url}/intellicatalog/v1/products/${user.userId}`, {
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
    const response = await fetch(`${api_url}/intellicatalog/v1/products/${produto.id}`, {
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
   
    const response = await fetch(`${api_url}/intellicatalog/v1/products`, {
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

    const response = await fetch(`${api_url}/intellicatalog/v1/products/${id}`, {
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
    const response = await fetch(`${api_url}/intellicatalog/v1/products/${productId}`, {
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

  
  const updateProductOrder = async(produtos) =>{

    // Estrutura do JSON esperado pelo backend
    const payload = {
      produtos: produtos.map((produto, index) => ({
        id: produto.id,        // ID da categoria
        product_order: index + 1 // Nova ordem (dependendo se começa com 1 ou 0)
      }))
    };
    //console.log("nova ordem:",payload);
    const response = await fetch(`${api_url}/intellicatalog/v1/products/reorder`, {
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
      throw new Error(errorData.message || "Erro ao atualizar produto");
    } else{
      return response;
    }
   

  }


  const updateEstoqueProduto = async(productId, estoque) => {
    console.log(productId)
    const newEstoque = { "estoque": estoque ? estoque : 0 }
    const response = await fetch(`${api_url}/intellicatalog/v1/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(newEstoque),
    });
  
    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
  }
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar estoque do produto");
    }
  
    return await response.json();

  }

  return {
    getProducts,
    deleteProduto,
    createProduto,
    updateProduto,
    changeProductStatus,
    updateProductOrder,
    updateEstoqueProduto
  };
}

export default ProductApi;