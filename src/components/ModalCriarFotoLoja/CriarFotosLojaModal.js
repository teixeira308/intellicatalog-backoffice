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
    description: "",
  });
  const [imageStoreUrls, setImageStoreUrls] = useState([]); // Estado para armazenar as URLs das imagens do produto

  // Função para carregar as imagens do produto

  const loadStoreImages = async () => {
    if (store) {
      try {
        const fotos = await getFotoByUserId(); // Busca todas as fotos do usuario
        //console.log("fotos por usuario: ", fotos)
        // Gera URLs para cada imagem junto com o ID
        const fotosUrls = await Promise.all(
          fotos.map(async (foto) => {
            const arrayBuffer = await getFotoStoreDownload(foto);
            const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
            return { id: foto.id, url, store_id: foto.store_id, description: foto.description }; // Retorna um objeto com o ID e a URL
          })
        );
        setImageStoreUrls(fotosUrls); // Define todas as URLs das imagens
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        window.addToast("Ocorreu um erro ao buscar fotos: "+ error, "error");
      }
    }
  };


  useEffect(() => {
    const fetchFotos = async () => {
      if (isOpen && store) {
        try {
          //console.log("store que entrou no modal:", store.id)
          const fotos = await getFotoByStoreId(store); // Busca todas as fotos do produto
          // Gera URLs para cada imagem junto com o ID
          const fotosUrls = await Promise.all(
            fotos.map(async (foto) => {
              const arrayBuffer = await getFotoStoreDownload(foto);
              const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
              const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
              return { id: foto.id, url, store_id: foto.store_id, description: foto.description }; // Retorna um objeto com o ID e a URL
            })
          );
          setImageStoreUrls(fotosUrls); // Define todas as URLs das imagens
        } catch (error) {
          console.error("Erro ao buscar fotos:", error);
          window.addToast("Ocorreu um erro ao buscar fotos: "+error, "error");
        }
      }
    };


    fetchFotos();
  }, [isOpen, store]);




  const resetFormData = () => {
    setFormData({
      file: "",
      description: "",
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
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);
      formDataToSend.append("description", formData.description);

      await createFotoStore(store, formDataToSend);

      // Após criar a foto, recarregar as imagens do produto
      loadStoreImages();
      window.addToast("Ação realizada com sucesso!", "success");
      handleClose();
      onCreate();
    } catch (error) {
      console.error("Erro ao criar foto:", error);
      window.addToast("Ocorreu um erro ao criar foto: "+error, "error");

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
                        <C.Description>{item.description}</C.Description>
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
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="description">Descrição</C.Label>
              <C.Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}

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
