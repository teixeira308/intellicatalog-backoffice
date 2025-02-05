import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import categoriaApi from "../../services/categoriaApi";
import productApi from "../../services/productApi";
import EditCategoriaModal from "../../components/ModalEditarCategoria/EditarCategoriaModal";
import CriarCategoriaModal from "../../components/ModalCriarCategoria/CriarCategoriaModal";
import DeleteCategoriaModal from "../../components/ModalDeleteCategoria/DeleteCategoriaModal";
import DeleteProdutoModal from "../../components/ModalDeleteProduto/DeleteProdutoModal";
import CriarProdutoModal from "../../components/ModalCriarProduto/CriarProdutoModal";
import EditarProdutoModal from "../../components/ModalEditarProduto/EditarProdutoModal";
import CriarFotosProdutoModal from "../../components/ModalCriarFotosProduto/CriarFotosProdutoModal";
import EditarEstoqueProdutoModal from "../../components/ModalEditarEstoqueProduto/EditarEstoqueProduto";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaEllipsisV, FaRandom, FaPlusCircle, FaBoxOpen } from 'react-icons/fa'; // Ícone de lápis
import { Container, Button, Card, CardContent, Typography, IconButton, Switch, Menu, MenuItem, Box } from "@mui/material";
import { AddCircle, MoreVert, Edit, Delete, Image, Inventory,Shuffle } from "@mui/icons-material";




const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const { getCategorias, changeStatus, deleteCategoria, updateCategoriaOrder } = categoriaApi();
  const { getProducts, deleteProduto, changeProductStatus, updateProductOrder } = productApi();
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [expandedCategorias, setExpandedCategorias] = useState([]); // Para controlar categorias expandidas
  const [isEditarCategoriaModalOpen, setIsEditarCategoriaModalOpen] = useState(false);
  const [isCriarCategoriaModalOpen, setIsCriarCategoriaModalOpen] = useState(false);
  const [isDeleteCategoriaModalOpen, setIsDeleteCategoriaModalOpen] = useState(false);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
  const [isEditarProdutoModalOpen, setIsEditarProdutoModalOpen] = useState(false)
  const [isEditarEstoqueProdutoModalOpen, setIsEditarEstoqueProdutoModalOpen] = useState(false)

  const [isCriarFotosProdutoModalOpen, setIsCriarFotosProdutoModalOpen] = useState(false)
  const [isCriarProdutoModalOpen, setIsCriarProdutoModalOpen] = useState(false);


  const [isDeleteProdutoModalOpen, setIsDeleteProdutoModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  const [isReorderMode, setIsReorderMode] = useState(false); // Estado para o modo de reordenação
  const [isReorderProductMode, setIsReorderProductMode] = useState(false); // Estado para o modo de reordenação

  const [menuAnchor, setMenuAnchor] = useState(null);

  const [menuProdAnchor, setMenuProdAnchor] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasData, produtosData] = await Promise.all([getCategorias(), getProducts()]);
        setCategorias(categoriasData.data);
        setProdutos(produtosData.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchData();
  }, []);
  

  // Função para alternar o status de uma categoria específica
  const toggleCategoriaStatus = async (categoriaId) => {
    try {
      const categoriaToUpdate = categorias.find((categoria) => categoria.id === categoriaId);
      const newStatus = categoriaToUpdate.status === "ativo" ? "inativo" : "ativo";

      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.id === categoriaId ? { ...categoria, status: newStatus } : categoria
        )
      );

      await changeStatus(categoriaId, newStatus === "ativo");
    } catch (error) {
      console.error("Erro ao atualizar status da categoria:", error);
    }
  };

  // Função para alternar o status de uma categoria específica
  const toggleProdutoStatus = async (produtoId) => {
    try {
      const produtoToUpdate = produtos.find((produto) => produto.id === produtoId);
      const newStatus = produtoToUpdate.status === "ativo" ? "inativo" : "ativo";

      setProdutos((prevProdutos) =>
        prevProdutos.map((produto) =>
          produto.id === produtoId ? { ...produto, status: newStatus } : produto
        )
      );

      await changeProductStatus(produtoId, newStatus === "ativo");
    } catch (error) {
      console.error("Erro ao atualizar status da categoria:", error);
    }
  };

  // Alternar visibilidade da lista de produtos por categoria
  const toggleCategoriaExpansion = (categoriaId) => {
    if (expandedCategorias.includes(categoriaId)) {
      setExpandedCategorias(expandedCategorias.filter((id) => id !== categoriaId));
    } else {
      setExpandedCategorias([...expandedCategorias, categoriaId]);
    }
  };

  // Filtrar produtos pela categoria
  const getProdutosByCategoria = (categoriaId) => {
    return produtos.filter((produto) => produto.category_id === categoriaId); // Certifique-se que `categoriaId` seja a chave correta
  };

  const handleNewCategoriaCreated = async () => {
    const data = await getCategorias();
    setCategorias(data.data);
  };

  const handleCategoriaEdited = async () => {
    const data = await getCategorias();
    setCategorias(data.data);
    setIsEditarCategoriaModalOpen(false)
  };

  const handleProdutoEdited = async () => {
    const data = await getProducts();
    setProdutos(data.data);
    setIsEditarProdutoModalOpen(false)
  };

  const handleEstoqueProdutoEdited = async () => {
    const data = await getProducts();
    setProdutos(data.data);
    setIsEditarEstoqueProdutoModalOpen(false)
  };


  const openProductMenu = (event, produtoId) => {
    setMenuProdAnchor((prevState) => ({
      ...prevState,
      [produtoId]: event.currentTarget,
    }));
  };

  const closeProductMenu = (produtoId) => {
    setMenuProdAnchor((prevState) => ({
      ...prevState,
      [produtoId]: null,
    }));
  };


  const handlCriarCategoriaModalClose = () => {
    setIsCriarCategoriaModalOpen(false);
  };

  const handleDeleteCategoriaModalClose = () => {
    setIsDeleteCategoriaModalOpen(false);
    setSelectedCategoriaId(null);
  };

  const handleDeleteCategoria = async () => {
    try {
      if (selectedCategoria) {
        await deleteCategoria(selectedCategoria);
        setCategorias(categorias.filter((categoria) => categoria.id !== selectedCategoria.id));
      }
      handleDeleteCategoriaModalClose();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  const openDeleteCategoriaModal = (categoria) => {
    setSelectedCategoria(categoria);
    setIsDeleteCategoriaModalOpen(true);
  };

  /*
  const openEditarCategoriaModal = (categoria) => {
    setSelectedCategoria(categoria);
    setIsEditarCategoriaModalOpen(true);
  };
  */

  const openEditarProdutoModal = (produto, categoria) => {
    setSelectedCategoria(categoria);
    setSelectedProduto(produto);
    setIsEditarProdutoModalOpen(true);
  };

  const openEditarEstoqueProdutoModal = (produto) => {
    setSelectedProduto(produto);
    setIsEditarEstoqueProdutoModalOpen(true);
  };

  const openDeleteProdutoModal = (produto) => {
    setSelectedProduto(produto);
    setIsDeleteProdutoModalOpen(true);
  };


  const handleDeleteProdutoModalClose = () => {
    setIsDeleteProdutoModalOpen(false);
    setSelectedProduto(null);
  };

  const handleDeleteProduto = async () => {
    try {
      if (selectedProduto) {
        await deleteProduto(selectedProduto);
        setProdutos(produtos.filter((produto) => produto.id !== selectedProduto.id));
      }
      handleDeleteProdutoModalClose();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  const handlCriarProdutoModalClose = async () => {
    setIsCriarProdutoModalOpen(false);
    setSelectedCategoria(null);
    const data = await getProducts();
    setProdutos(data.data);
  };

  const handleNewProdutoCreated = async () => {
    const data = await getProducts();
    setProdutos(data.data);
  };

  const openCriarProdutoModal = (categoria) => {
    setSelectedCategoria(categoria)
    setIsCriarProdutoModalOpen(true)
  }

  const handleNewFotoProdutoCreated = async () => {
    const data = await getProducts();
    setProdutos(data.data);
  };

  const openCriarFotosProdutoModal = (produto) => {
    setSelectedProduto(produto);
    setIsCriarFotosProdutoModalOpen(true);
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    // Índices de origem e destino vindos do drag-and-drop (começam de 0)
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // console.log('Índice de origem:', sourceIndex);
    //console.log('Índice de destino:', destinationIndex);

    // Cria uma cópia do array de categorias
    const reorderedCategorias = [...categorias];

    // Remove o item da posição inicial
    const [reorderedItem] = reorderedCategorias.splice(sourceIndex, 1);

    // Insere o item na nova posição
    reorderedCategorias.splice(destinationIndex, 0, reorderedItem);

    // console.log("Categorias reorganizadas:", reorderedCategorias);

    try {
      // Enviar nova ordem para o backend
      const response = await updateCategoriaOrder(reorderedCategorias);
      if (response.status === 200) {
        const data = await getCategorias();
        setCategorias(data.data);
        //console.log("Categorias reatualizadas do backend:", data.data);
        setIsReorderMode(false)
      } else {
        console.error("Erro inesperado ao atualizar a ordem das categorias:", response);
      }
    } catch (error) {
      console.error("Erro ao atualizar a ordem das categorias:", error);
    }
  };


  const handleProductOnDragEnd = async (result, categoriaId) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const produtosDaCategoria = getProdutosByCategoria(categoriaId);
    const [reorderedItem] = produtosDaCategoria.splice(sourceIndex, 1);
    produtosDaCategoria.splice(destinationIndex, 0, reorderedItem);

    //console.log(produtosDaCategoria)
    try {
      const response = await updateProductOrder(produtosDaCategoria);

      if (response.status === 200) {
        const data = await getProducts();
        setProdutos(data.data);
        setIsReorderProductMode(false);
      } else {
        console.error("Erro inesperado ao atualizar a ordem dos produtos:", response.status);
      }
    } catch (error) {
      console.error("Erro ao atualizar a ordem dos produtos:", error);
    }
  };


  // Função para abrir o menu específico de cada categoria
  const handleMenuOpen = (event, categoria) => {
    setSelectedCategoria(categoria);
    setMenuAnchor(event.currentTarget);
  };

  // Função para fechar o menu
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // Função para abrir o modal de edição com a categoria correta
  const openEditarCategoriaModal = () => {
    setIsEditarCategoriaModalOpen(true);
    handleMenuClose(); // Fecha o menu antes de abrir o modal
  };



  return (
    <>
 <Container maxWidth="md">
      <Navbar />
      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>Meu Catálogo</Typography>
      
      <Box display="flex" justifyContent="center" gap={2} my={2}>
        {!isReorderMode && (
          <Button variant="contained" startIcon={<AddCircle />} onClick={() => {}}>
            Nova Categoria
          </Button>
        )}
        <Button variant="outlined" startIcon={<Shuffle />} onClick={() => setIsReorderMode(!isReorderMode)}>
          {isReorderMode ? "Salvar Ordem" : "Reordenar Categorias"}
        </Button>
      </Box>

      {isReorderMode ? (
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="categorias">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {categorias.map((categoria, index) => (
                  <Draggable key={categoria.id} draggableId={String(categoria.id)} index={index}>
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ my: 1, p: 2 }}>
                        <Typography variant="h6">{categoria.name}</Typography>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        categorias.map((categoria) => (
          <Card key={categoria.id} sx={{ my: 1, p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{categoria.name}</Typography>
              <Box>
                <IconButton onClick={(event) => handleMenuOpen(event, categoria)}>
                  <MoreVert />
                </IconButton>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                  <MenuItem onClick={() => {}}><Edit sx={{ mr: 1 }} /> Editar</MenuItem>
                  <MenuItem onClick={() => {}}><Delete sx={{ mr: 1 }} /> Excluir</MenuItem>
                </Menu>
                <Switch checked={categoria.status === "ativo"} onChange={() => {}} />
              </Box>
            </Box>
          </Card>
        ))
      )}
    

      <EditCategoriaModal
        isOpen={isEditarCategoriaModalOpen}
        onClose={() => setIsEditarCategoriaModalOpen(false)}
        categoria={selectedCategoria}
        onEdit={handleCategoriaEdited}
      />

      <CriarCategoriaModal
        isOpen={isCriarCategoriaModalOpen}
        onClose={handlCriarCategoriaModalClose}
        onCreate={handleNewCategoriaCreated}
      />

      <DeleteCategoriaModal
        isOpen={isDeleteCategoriaModalOpen}
        onClose={handleDeleteCategoriaModalClose}
        onDelete={handleDeleteCategoria}
        categoria={selectedCategoria}
      />

      <DeleteProdutoModal
        isOpen={isDeleteProdutoModalOpen}
        onClose={handleDeleteProdutoModalClose}
        onDelete={handleDeleteProduto}
        produto={selectedProduto}
      />

      <CriarProdutoModal
        isOpen={isCriarProdutoModalOpen}
        onClose={handlCriarProdutoModalClose}
        onCreate={handleNewProdutoCreated}
        categoria={selectedCategoria}
      />

      <EditarProdutoModal
        isOpen={isEditarProdutoModalOpen}
        onClose={() => setIsEditarProdutoModalOpen(false)}
        categoria={selectedCategoria}
        produto={selectedProduto}
        onEdit={handleProdutoEdited}
      />

      <EditarEstoqueProdutoModal
        isOpen={isEditarEstoqueProdutoModalOpen}
        onClose={() => setIsEditarEstoqueProdutoModalOpen(false)}
        produto={selectedProduto}
        onEdit={handleEstoqueProdutoEdited}
      />

      <CriarFotosProdutoModal
        isOpen={isCriarFotosProdutoModalOpen}
        onClose={() => setIsCriarFotosProdutoModalOpen(false)}
        categoria={selectedCategoria}
        produto={selectedProduto}
        onCreate={handleNewFotoProdutoCreated}
      />

</Container>
</>
  );
};

export default Catalogo;
