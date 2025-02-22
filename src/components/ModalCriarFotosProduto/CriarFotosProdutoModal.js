import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productImageApi from "../../services/productImageApi";
import loadingGif from '../loading.gif';
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CriarFotosProdutoModal = ({ isOpen, onClose, produto, onCreate }) => {
  const { createFotoProduto, getFotoProdutoDownload, getFotoByProduto, deleteFotoByProduto, reorderProductImages } = productImageApi();
  const [fotos, setFotos] = useState([]);
  const [formData, setFormData] = useState({
    file: null,
  });
  const [imageUrls, setImageUrls] = useState([]); // Estado para armazenar as URLs das imagens do produto
  const [loading, setLoading] = useState(false);
  const [isReordering, setIsReordering] = useState(false); // Estado para ativar a reordenação


  // Função para reordenar a lista localmente
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedImages = reorder(imageUrls, result.source.index, result.destination.index);
    setImageUrls(reorderedImages);

    // Preparar os dados para o backend
    const imagensReordenadas = reorderedImages.map((item, index) => ({
      id: item.id,
      image_product_order: index + 1, // Garantir que a ordem seja sequencial
    }));

    try {
      await reorderProductImages(imagensReordenadas);
      window.addToast("Ordem das fotos atualizada!", "success");
    } catch (error) {
      console.error("Erro ao atualizar ordem:", error);
      window.addToast("Erro ao atualizar ordem das fotos", "error");
    }
  };


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
        window.addToast("Ocorreu um erro ao buscar fotos: " + error, "error");
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
    let file = formData.file;

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


    if (file && file.name.includes("_")) {

      const newFileName = file.name.replace(/_/g, "-");
      file = new File([file], newFileName, { type: file.type });
    }
    setLoading(true);

    // Enviar o arquivo após validação
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);

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
      window.addToast("Ocorreu um erro ao deletar a imagem: " + error, "error");
    }
  };


  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        width: 400,
        margin: 'auto',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <C.ModalHeader>
          <Typography variant="h6" mb={2}>Fotos do Produto</Typography>


        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          <C.FormRow>
            <C.FormColumn>
              <Typography variant="subtitle1" mb={2}>Produto: {produto.titulo}</Typography>
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <Typography variant="subtitle1" mb={2}>Escolha a foto: </Typography>
              {/*}   <C.Input
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
                required
              /> {*/}
              <TextField

                type="file"
                name="file"
                id="file"
                onChange={handleChange}
                required
                fullWidth
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Fechar</Button>
            </C.FormColumn>
            <C.FormColumn>
              <Button type="submit" color="success" variant="contained">Adicionar</Button>
            </C.FormColumn>
          </C.FormRow>
          {/* Exibir todas as imagens do produto */}
          {loading ? (
            <C.LoadingImage src={loadingGif} alt="Carregando..." />
          ) : (
            <>
              {isReordering ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="image-gallery">
                    {(provided) => (
                      <C.ImageGallery ref={provided.innerRef} {...provided.droppableProps}>
                        {imageUrls.map((item, index) => (
                          <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                            {(provided) => (
                              <C.ImagePreview
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img src={item.url} alt={`Foto ${produto.titulo}`} />
                              </C.ImagePreview>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </C.ImageGallery>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <C.ImageGallery>
                  {imageUrls.map((item, index) => (
                    <C.ImagePreview key={index}>
                      <img src={item.url} alt={`Foto do Produto ${produto.titulo}`} />
                      <C.DeleteButton onClick={() => handleDeleteImage(item.id)}>✖</C.DeleteButton>
                    </C.ImagePreview>
                  ))}
                </C.ImageGallery>
              )}
            </>
          )}
        </C.ModalForm>
        <C.InfoText> {/* Estilize conforme necessário */}
          A primaira imagem será a capa que aparecerá na lista de produtos.
        </C.InfoText>
        {/* Botão para ativar reordenação */}
        {imageUrls.length > 1 && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsReordering(!isReordering)}
            sx={{ mt: 2 }}
          >
            {isReordering ? "Finalizar Reordenação" : "Reordenar Fotos"}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default CriarFotosProdutoModal;
