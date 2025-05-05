import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const CatalogoApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

  const checkAuth = (response) => {
    if (response.status === 401) {
      navigate("/login");
    }
    return response;
  };

  const getCatalogOrder = async () => {
    const response = await fetch(`${api_url}/intellicatalog/v1/catalogo-order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    checkAuth(response);

    if (!response.ok) {
      throw new Error("Erro ao buscar catálogo");
    }

    return await response.json();
  };

  const criar = async (item) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/catalogo-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(item),
    });

    checkAuth(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar item do catálogo");
    }

    return await response.json();
  };

  const updateCatagoriaOrder = async (id, dados) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/catalogo-order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(dados),
    });

    checkAuth(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar item");
    }

    return await response.json();
  };

  const deletar = async (id) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/catalogo-order/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    checkAuth(response);

    if (!response.ok) {
      throw new Error("Erro ao deletar item");
    }

    return await response.json();
  };

  const reordenar = async (itens) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/catalogo/reorder`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(itens), // Ex: [{ id: 1, ordem: 1 }, { id: 2, ordem: 2 }]
    });

    checkAuth(response);

    if (!response.ok) {
      throw new Error("Erro ao reordenar catálogo");
    }

    return await response.json();
  };

  return {
    getCatalogOrder,
    criar,
    updateCatagoriaOrder,
    deletar,
    reordenar,
  };
};

export default CatalogoApi;
