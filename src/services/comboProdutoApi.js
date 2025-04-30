import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const ComboProdutoApi = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API;

  const listarProdutosDoCombo = async (combo_id) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combos/${combo_id}/produtos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    if (response.status === 401) navigate("/login");
    if (!response.ok) throw new Error("Erro ao listar produtos do combo");

    return await response.json();
  };

  const addProdutoAoCombo = async (combo_id, product_id) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combo-produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ combo_id, product_id }),
    });

    if (response.status === 401) navigate("/login");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao adicionar produto ao combo");
    }

    return await response.json();
  };

  const removerProdutoDoCombo = async (combo_id, product_id) => {
    const response = await fetch(`${api_url}/intellicatalog/v1/combo-produtos`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ combo_id, product_id }),
    });

    if (response.status === 401) navigate("/login");
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao remover produto do combo");
    }

    return await response.json();
  };

  return {
    listarProdutosDoCombo,
    addProdutoAoCombo,
    removerProdutoDoCombo,
  };
};

export default ComboProdutoApi;
