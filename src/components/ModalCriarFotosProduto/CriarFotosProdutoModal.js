import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productImageApi from "../../services/productImageApi";
import loadingGif from '../loading.gif';

const CriarFotosProdutoModal = ({ isOpen, onClose, produto, onCreate }) => {
  const { createFotoProduto, getFotoProdutoDownload, getFotoByProduto, deleteFotoByProduto } = productImageApi();
  const [fotos, setFotos] = useState([]);
  const [formData, setFormData] = useState({
    file: null,
    description: "",
  });
  const [imageUrls, setImageUrls] = useState([]); // Estado para armazenar as URLs das imagens do produto
  const [loading, setLoading] = useState(false);

  // Função para carregar as imagens do produto
  const loadProductImages = async () => {
    setLoading(true)
    if (isOpen && produto) {
      try {
        const fotos = await getFotoByProduto(produto); // Busca todas as fotos do produto


        // Gera URLs para cada imagem junto com o ID
        const fotosUrls = await Promise.all(
          fotos.map(async (foto) => {
            const arrayBuffer = await getFotoProdutoDownload(produto, foto);
            const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
            return { id: foto.id, url }; // Retorna um objeto com o ID e a URL
          })
        );
        setImageUrls(fotosUrls); // Define todas as URLs das imagens
        setLoading(false)
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
      }
    }
  };


  useEffect(() => {
    const fetchFotos = async () => {
      setLoading(true)
      if (isOpen && produto) {
        try {
          const fotos = await getFotoByProduto(produto); // Busca todas as fotos do produto


          // Gera URLs para cada imagem junto com o ID
          const fotosUrls = await Promise.all(
            fotos.map(async (foto) => {
              const arrayBuffer = await getFotoProdutoDownload(produto, foto);
              const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
              const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
              return { id: foto.id, url }; // Retorna um objeto com o ID e a URL
            })
          );
          setImageUrls(fotosUrls); // Define todas as URLs das imagens
          setLoading(false)
        } catch (error) {
          console.error("Erro ao buscar fotos:", error);
        }
      }
    };

    fetchFotos();
  }, [isOpen, produto]);




  const resetFormData = () => {
    setFormData({
      file: "",
      description: "",
    });
    setImageUrls([]); // Limpa as URLs das imagens ao fechar o modal
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
    setLoading(true)
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);
      formDataToSend.append("description", formData.description);

      await createFotoProduto(produto, formDataToSend);

      // Após criar a foto, recarregar as imagens do produto
      loadProductImages();


      handleClose();
      onCreate();
    } catch (error) {
      console.error("Erro ao criar foto:", error);
    }
  };

  if (!isOpen) return null;

  const handleDeleteImage = async (id) => {
    setLoading(true)
    try {
      // Chame a API para deletar a imagem pelo ID
      await deleteFotoByProduto(id);

      // Atualize o estado para remover a imagem da interface
      setImageUrls((prevImages) => prevImages.filter((item) => item.id !== id));
      setLoading(false)
    } catch (error) {
      console.error("Erro ao deletar a imagem:", error);
    }
  };


  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Fotos do Produto</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Produto: {produto.titulo}</C.Label>
            </C.FormColumn>
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
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="descricao">Descrição</C.Label>
              <C.Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.Button type="submit">Salvar</C.Button>

          {/* Exibir todas as imagens do produto */}
          {loading ? (
            <>
              {/* Exibe o GIF de carregamento */}
              <C.LoadingImage src={loadingGif} alt="Carregando..." />
            </>
          ) : (
            <>
              {imageUrls && (
                <C.ImageGallery>
                  {imageUrls.map((item, index) => (
                    <C.ImagePreview key={index}> {/* Use o id como chave */}
                      <img src={item.url} alt={`Foto do Produto ${produto.titulo}`} />
                      <C.DeleteButton onClick={() => handleDeleteImage(item.id)}>✖</C.DeleteButton> {/* Passa o id para a função de deletar */}

                    </C.ImagePreview>

                  ))}
                </C.ImageGallery>
              )} </>)}
        </C.ModalForm>
        <C.InfoText> {/* Estilize conforme necessário */}
          A primaira imagem será a capa que aparecerá na lista de produtos.
        </C.InfoText>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default CriarFotosProdutoModal;
