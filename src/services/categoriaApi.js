import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const CategoriaApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;
  //const api_url = 'http://localhost/api'

  const getCategorias = async (page = 1, pageSize = 10) => {

    const response = await fetch(`${api_url}/intellicatalog/v1/categories/users/${user.userId}?mode=backoffice&page=${page}&pageSize=${pageSize}`, {
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
    const newStatus = { "status": isOpen ? "ativo" : "inativo" }

    const response = await fetch(`${api_url}/intellicatalog/v1/categories/${id}`, {
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

  const updateCategoria = async (id, categoria) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(categoria),
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar categoria");
    }

    return await response.json();

  }

  const createCategoria = async (categoria) => {

    const categoriaComUserId = {
      ...categoria,
      user_id: user.userId, // Pega o user_id do objeto `user`
    };

    const response = await fetch(`${api_url}/intellicatalog/v1/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(categoriaComUserId),
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

  const deleteCategoria = async (categoria) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/categories/${categoria.id}`, {
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

  const updateCategoriaOrder = async (categorias) => {

    try {
      // Estrutura do JSON esperado pelo backend
      const payload = {
        categorias: categorias.map((categoria, index) => ({
          id: categoria.id,        // ID da categoria
          catalog_order: index + 1 // Nova ordem (dependendo se começa com 1 ou 0)
        }))
      };

      console.log(JSON.stringify(payload))
      // Fazer requisição para atualizar a ordem das categorias
      const response = await fetch(`${api_url}/intellicatalog/v1/categories/reorder`, {
        method: 'PUT',             // ou 'PUT', dependendo do backend
        headers: {
          'Content-Type': 'application/json', // Tipo de conteúdo esperado
          Authorization: `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload),        // Corpo da requisição com a nova ordem
      });

      // Verificar o status da resposta
      if (response.ok) {
        console.log('Ordem das categorias atualizada com sucesso.');
        return response;
      } else {
        console.error('Erro ao atualizar a ordem das categorias.');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição para atualizar a ordem das categorias:', error);
    }
   
  };

  const getCategoria = async (categoria) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/categories/${categoria}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 401) {
      // Redireciona para a tela de login
      navigate('/login');
    }

    if (!response.ok) {
      throw new Error("Erro ao consultar categoria");
    }

    return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.

  }

  return {
    getCategorias,
    changeStatus,
    updateCategoria,
    createCategoria,
    deleteCategoria,
    updateCategoriaOrder,
    getCategoria
  };
}

export default CategoriaApi;