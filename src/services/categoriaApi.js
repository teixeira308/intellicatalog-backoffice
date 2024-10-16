import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const CategoriaApi = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const getCategorias = async () => {
       
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/categories/users/${user.userId}`, {
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
        const newStatus = {"status": isOpen ? "ativo":"inativo"}
      
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/categories/${id}`, {
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
    
    const updateCategoria = async (id, categoria)=>{
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/categories/${id}`, {
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

    const createCategoria = async(categoria) =>{

        const categoriaComUserId = {
            ...categoria,
            user_id: user.userId, // Pega o user_id do objeto `user`
          };

         
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/categories`, {
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

    const deleteCategoria = async(categoria) =>{
        const response = await fetch(`http://localhost:3000/intellicatalog/v1/categories/${categoria.id}`, {
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

    return {
        getCategorias,
        changeStatus,
        updateCategoria,
        createCategoria,
        deleteCategoria
      };
}

export default CategoriaApi;