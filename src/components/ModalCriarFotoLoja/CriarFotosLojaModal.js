import React, { useState, useEffect } from "react";
import * as C from "./styles";
import LojaImageApi from "../../services/lojaImageApi";
import loadingGif from '../loading.gif';

const CriarFotosLojaModal = ({ isOpen, onClose, store, onCreate }) => {
  //const { createFotoProduto, getFotoProdutoDownload, getFotoByProduto, deleteFotoByProduto } = LojaImageApi();
  const { getFotoStoreDownload, getFotoByStoreId, getFotoByUserId, deleteFotoByStore, createFotoStore } = LojaImageApi();
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    file: null, 
  });
  const [imageStoreUrls, setImageStoreUrls] = useState([]); // Estado para armazenar as URLs das imagens do produto

  // Função para carregar as imagens do produto

  const loadStoreImages = async () => {
    if (store) {
      try {
        const fotos = await getFotoByUserId(); // Busca todas as fotos do usuário
        // console.log("fotos por usuario: ", fotos);
  
        // Gera URLs para cada imagem junto com o ID
        const fotosUrls = await Promise.all(
          fotos.map(async (foto) => {
            try {
              const arrayBuffer = await getFotoStoreDownload(foto);
              const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
              const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
              return {
                id: foto.id,
                url,
                store_id: foto.store_id
              }; // Retorna um objeto com o ID, URL, store_id e descrição
            } catch (error) {
              console.warn(`Erro ao carregar a imagem com ID ${foto.id}:`, error);
              return null; // Retorna `null` em caso de erro
            }
          })
        );
  
        // Remove entradas nulas do array antes de definir no estado
        setImageStoreUrls(fotosUrls.filter((foto) => foto !== null));
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        window.addToast("Ocorreu um erro ao buscar fotos: " + error, "error");
        setLoading(false);
      }
    }
  };
  


  useEffect(() => {
    const fetchFotos = async () => {
      if (isOpen && store) {
        try {
          // console.log("store que entrou no modal:", store.id);
          const fotos = await getFotoByStoreId(store); // Busca todas as fotos do produto
  
          // Gera URLs para cada imagem junto com o ID
          const fotosUrls = await Promise.all(
            fotos.map(async (foto) => {
              try {
                const arrayBuffer = await getFotoStoreDownload(foto);
                const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
                const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
                return {
                  id: foto.id,
                  url,
                  store_id: foto.store_id
                }; // Retorna um objeto com o ID, URL, store_id e descrição
              } catch (error) {
                console.warn(`Erro ao carregar a imagem com ID ${foto.id}:`, error);
                return null; // Retorna `null` em caso de erro
              }
            })
          );
  
          // Remove entradas nulas do array antes de definir no estado
          setImageStoreUrls(fotosUrls.filter((foto) => foto !== null));
        } catch (error) {
          console.error("Erro ao buscar fotos:", error);
          window.addToast("Ocorreu um erro ao buscar fotos: " + error, "error");
        }
      }
    };
  
    fetchFotos();
  }, [isOpen, store]);
  




  const resetFormData = () => {
    setFormData({
      file: ""
    });
    setImageStoreUrls([]); // Limpa as URLs das imagens ao fechar o modal
  };

  const handleClose = () => {
    resetFormData();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let file = formData.file;
  
    if (file && file.name.includes("_")) {
      const newFileName = file.name.replace(/_/g, "-");
      file = new File([file], newFileName, { type: file.type });
    }
  
    /*
    if (file) {
      // Verifique o tipo de arquivo
      const fileType = file.type;
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        alert('Tipo de arquivo não suportado');
        return;
      }
  
      // Verifique o tamanho do arquivo
      const fileSize = file.size / 1024 / 1024; // Tamanho em MB
      if (fileSize > 5) { // Suponha que o limite seja 5MB
        alert('O arquivo é muito grande. O limite é 5MB');
        return;
      }
    } else {
      alert('O arquivo é obrigatório e está ausente.');
      return;
    }
    */
  
    setLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("file", file); // Adiciona o arquivo corrigido
  
    try {
      // Faz a chamada para criar a foto
    
      await createFotoStore(store, formDataToSend);
      
      // Após sucesso, recarregar imagens
      loadStoreImages();
  
      window.addToast("Ação realizada com sucesso!", "success");
      handleClose(); // Fecha o modal
      onCreate(); // Atualiza a interface com a nova foto
    } catch (error) {
      console.error("Erro ao criar foto:", error);
  
      // Adiciona um toast para informar o erro
      window.addToast("Ocorreu um erro ao criar a foto: " + error.message, "error");
    } finally {
      setLoading(false); // Para o estado de carregamento
    }
  };
  
  

  if (!isOpen) return null;

  const handleDeleteImage = async (id) => {
    setLoading(true);
    try {
      // Chame a API para deletar a imagem pelo ID
      //console.log("store-image-id: ", id)
      //console.log("store-id: ", store.id)
      await deleteFotoByStore(store.id, id);
      window.addToast("Ação realizada com sucesso!", "success");
      // Atualize o estado para remover a imagem da interface
      setImageStoreUrls((prevImages) => prevImages.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Erro ao deletar a imagem:", error);
      window.addToast("Ocorreu um erro ao deletar a imagem: "+ error, "error");
    }
  };


  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Fotos da Loja</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Loja: {store.namestore}</C.Label>
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            {/* Exibir todas as imagens do produto */}
            {loading ? (
              <>
                {/* Exibe o GIF de carregamento */}
                <C.LoadingImage src={loadingGif} alt="Carregando..." />
              </>
            ) : (
              <>
                {imageStoreUrls.length > 0 && (
                  <C.ImageGallery>
                    {imageStoreUrls.slice(0, 1).map((item) => ( // Exibe apenas a primeira imagem
                      <>
                        <C.ImagePreview key={item.id}> {/* Use o id como chave */}
                          <img src={item.url} alt={`Foto da Loja ${store.namestore}`} />

                          <C.DeleteButton onClick={() => handleDeleteImage(item.id)}>✖</C.DeleteButton>
                        </C.ImagePreview>
                       
                      </>
                    ))}
                  </C.ImageGallery>
                )}
              </>)}
          </C.FormRow>
          <C.FormRow>
            <C.Label htmlFor="file">Escolha a foto:</C.Label>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Input
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
                required
                disabled={imageStoreUrls.length > 0}
              />
            </C.FormColumn>
          </C.FormRow>
        

          <C.Button type="submit">Salvar</C.Button>


        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default CriarFotosLojaModal;
