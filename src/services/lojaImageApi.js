import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from 'react-router-dom';

const LojaImageApi = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const api_url = process.env.REACT_APP_API;
    
    const createFotoStore = async (store, photo) => {
        if (!(photo instanceof FormData)) {
            throw new Error("O parâmetro 'photo' não é um FormData válido.");
        }
    
        // 🔍 Debug: Exibir os dados do FormData
        for (let pair of photo.entries()) {
            console.log(`FormData -> ${pair[0]}:`, pair[1]);
        }
    
        try {
            const response = await fetch(`${api_url}/intellicatalog/v1/stores/${store.id}/store_images/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user?.token}`, // 🔥 Não definir `Content-Type`, o `fetch` já faz isso para `FormData`
                },
                body: photo,
            });
    
            if (response.status === 403) {
                navigate('/login');
                throw new Error("Acesso não autorizado, redirecionando para login.");
            }
    
            const contentType = response.headers.get("content-type");
    
            if (!response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Erro ao enviar imagem para a loja");
                } else {
                    const errorText = await response.text();
                    throw new Error(`Erro inesperado: ${errorText}`);
                }
            }
    
            return response.json();
        } catch (error) {
            console.error("Erro durante o envio do arquivo:", error);
            throw error;
        }
    };
    

    const deleteFotoByStore = async(storeId,storeImageId) =>{

        const response = await fetch(`${api_url}/intellicatalog/v1/stores/${storeId}/store_images/${storeImageId}`, {
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
            throw new Error("Erro ao deletar imagem da loja");
        }
        
        return response.json(); // Opcional, pode ser ignorado se a resposta não contiver dados.
    }

    const getFotoByStoreId = async (store) => {
        // console.log("store de dentro: ", store.id);
        const response = await fetch(`${api_url}/intellicatalog/v1/stores/${store.id}/store_images`, {
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
      
        if (response.status === 403) {
          // Retorna um array vazio quando não há fotos
          console.warn("Nenhuma foto cadastrada para esta loja.");
          return [];
        }
      
        if (!response.ok) {
          throw new Error("Erro ao buscar imagens da store");
        }
      
        return await response.json();
      };
      
    const getFotoByStore = async (store, store_image_id) => {

        const response = await fetch(`${api_url}/intellicatalog/v1/stores/${store.id}/store_images/${store_image_id}`, {
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
            throw new Error("Erro ao buscar imagens da store");
        }

        return await response.json();
    }


    const getFotoByUserId = async () => {  
        
        const response = await fetch(`${api_url}/intellicatalog/v1/stores/store_images/user/${user.userId}`, {
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
            throw new Error("Erro ao buscar imagens da store");
        }
        
        return await response.json();
    }

    

    const getFotoStoreDownload = async (photo) => {
        const response = await fetch(`${api_url}/intellicatalog/v1/stores/${photo.store_id}/store_images/download?arquivo=${photo.nomearquivo}`, {
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

    return {
        createFotoStore,
        deleteFotoByStore,
        getFotoByStore,
        getFotoByUserId,
        getFotoStoreDownload,
        getFotoByStoreId
    };
}

export default LojaImageApi;
