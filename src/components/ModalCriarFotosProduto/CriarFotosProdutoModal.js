import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productImageApi from "../../services/productImageApi";
import loadingGif from '../loading.gif';

const CriarFotosProdutoModal = ({ isOpen, onClose, produto, onCreate }) => {
  const { createFotoProduto, getFotoProdutoDownload, getFotoByProduto, deleteFotoByProduto } = productImageApi();
  const [fotos, setFotos] = useState([]);
  const [formData, setFormData] = useState({
    file: null,
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
        window.addToast("Ocorreu um erro ao buscar fotos: "+error, "error");
      }
    }
  };


  useEffect(() => {
    const fetchFotos = async () => {
      setLoading(true);
      if (isOpen && produto) {
        try {
          const fotos = await getFotoByProduto(produto); // Busca todas as fotos do produto
  
          // Gera URLs para cada imagem junto com o ID
          const fotosUrls = await Promise.all(
            fotos.map(async (foto) => {
              try {
                const arrayBuffer = await getFotoProdutoDownload(produto, foto);
                const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
                const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
                return { id: foto.id, url }; // Retorna um objeto com o ID e a URL
              } catch (error) {
                console.warn(`Erro ao carregar a imagem com ID ${foto.id}:`, error);
                return null; // Retorna `null` se ocorrer um erro
              }
            })
          );
  
          // Remove entradas nulas do array antes de definir no estado
          setImageUrls(fotosUrls.filter((foto) => foto !== null));
          setLoading(false);
        } catch (error) {
          console.error("Erro ao buscar fotos:", error);
          window.addToast("Ocorreu um erro ao buscar fotos: " + error, "error");
          setLoading(false);
        }
      }
    };
  
    fetchFotos();
  }, [isOpen, produto]);
  




  const resetFormData = () => {
    setFormData({
      file: "", 
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
    const file = formData.file;
  
   /* if (file) {
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
      }*/
    }
  
    if (file && file.name.includes("_")) {
      const newFileName = file.name.replace(/_/g, "-");
      file = new File([file], newFileName, { type: file.type });
    }
    setLoading(true);
  
    // Enviar o arquivo após validação
    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file);
  
    try {
      await createFotoProduto(produto, formDataToSend);
      loadProductImages();
      window.addToast("Foto criada com sucesso!", "success");
      handleClose();
      onCreate();
    } catch (error) {
      console.error("Erro ao criar foto:", error);
      window.addToast("Ocorreu um erro ao criar a foto: " + error.message, "error");
    } finally {
      setLoading(false);
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
      window.addToast("Ocorreu um erro ao deletar a imagem: "+ error, "error");
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
