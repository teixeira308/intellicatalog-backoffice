import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const ComboApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

  const listAllCombos = async (page = 1, pageSize = 10) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combos?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 401) navigate('/login');

    if (!response.ok) {
      throw new Error("Erro ao buscar combos");
    }

    return await response.json();
  };

  const getCombo = async (id) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combos/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 401) navigate('/login');
    if (!response.ok) throw new Error("Erro ao buscar combo");

    return await response.json();
  };

  const createCombo = async (combo, category_id) => {
    const comboComUserId = {
      ...combo,
      category_id: category_id,
      user_id: user.userId,
    };

    const response = await fetch(`${api_url}/intellicatalog/v1/combos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(comboComUserId),
    });

    if (response.status === 401) navigate('/login');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar combo");
    }

    return await response.json();
  };

  const updateCombo = async (id, combo) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(combo),
    });

    if (response.status === 401) navigate('/login');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar combo");
    }

    return await response.json();
  };

  const deleteCombo = async (id) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 401) navigate('/login');
    if (!response.ok) throw new Error("Erro ao excluir combo");

    return await response.json();
  };

  return {
    listAllCombos,
    getCombo,
    createCombo,
    updateCombo,
    deleteCombo,
  };
};

export default ComboApi;
