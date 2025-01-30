import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const ProductImageApi = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API;

    const createFotoProduto = async (product, photo) => {
        
        try {
            const formData = new FormData();
            formData.append("file", photo);
            const response = await fetch(`${api_url}/intellicatalog/v1/products/${product.id}/products_images/upload`, {
                method: "POST",
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': '*',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: photo,
            });

            if (response.status === 403) {
                // Redireciona para a tela de login
                navigate('/login');
            }

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData.message);
                throw new Error(errorData.message || "Erro ao criar pessoa");
            }

            return response.json();
        } catch (error) {
            console.error('Erro durante o envio do arquivo:', error);
            throw error;
        }
    }

    const getFotoProdutoDownload = async (product, photo) => {
        const response = await fetch(`${api_url}/intellicatalog/v1/products/${product.id}/products_images/download?arquivo=${photo.nomearquivo}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });
      
        if (response.status === 401) {
          navigate('/login'); // Redireciona para a tela de login
        }
      
        if (!response.ok) {
          throw new Error("Erro ao fazer download da imagem");
        }
      
        const arrayBuffer = await response.arrayBuffer();
        
        // Converte o ArrayBuffer para Blob, certificando-se de usar o tipo correto de imagem
        const blob = new Blob([arrayBuffer], { type: "image/png" });
      
        return blob; // Retorna o Blob
      };
      

    const getFotoByProduto = async (product) => {

        const response = await fetch(`${api_url}/intellicatalog/v1/products/${product.id}/products_images`, {
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
            throw new Error("Erro ao buscar imagens do produto");
        }

        return await response.json();
    }

    const deleteFotoByProduto = async(fotoId) =>{

        const response = await fetch(`${api_url}/intellicatalog/v1/products/${fotoId}/products_images`, {
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
        createFotoProduto,
        getFotoProdutoDownload,
        getFotoByProduto,
        deleteFotoByProduto
    };
}
export default ProductImageApi;