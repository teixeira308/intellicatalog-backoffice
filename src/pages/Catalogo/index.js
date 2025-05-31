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
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaEllipsisV, FaBoxOpen, FaAngleLeft, FaAngleRight, FaAngleDown } from 'react-icons/fa'; // Ícone de lápis
import { Container, Button, Card, Typography, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { AddCircle, Shuffle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import catalogOrderApi from '../../services/catalogoOrderApi';



const Catalogo = () => {
  const navigate = useNavigate();
  //services
  const { getCatalogOrder, reordenarAllCategory } = catalogOrderApi();
  const { getCategorias, changeStatus, deleteCategoria, updateCategoriaOrder } = categoriaApi();
  const {changeProductStatus} = productApi();
  //states
  const [categorias, setCategorias] = useState([]);
  const [catalogoOrdem, setCatalogoOrdem] = useState([]);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState({});
  const [selectedProduto, setSelectedProduto] = useState(null);
  // Para controlar categorias expandidas
  const [expandedCategorias, setExpandedCategorias] = useState([]);
  //reordenar
  const [isReorderMode, setIsReorderMode] = useState(false); // Estado para o modo de reordenação
  const [isReorderProductMode, setIsReorderProductMode] = useState(false); // Estado para o modo de reordenação
  //search
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  //paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //controlar modal
  const [isCriarCategoriaModalOpen, setIsCriarCategoriaModalOpen] = useState(false);
  const [isEditarCategoriaModalOpen, setIsEditarCategoriaModalOpen] = useState(false);
  const [isDeleteCategoriaModalOpen, setIsDeleteCategoriaModalOpen] = useState(false);
  const [isCriarProdutoModalOpen, setIsCriarProdutoModalOpen] = useState(false);
  //ancora para o menu de categoria
  const [menuAnchor, setMenuAnchor] = useState(null);
  //controlar categoria selecionada para editar o deletar no modal
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  //menu produtos
  const [menuProdAnchor, setMenuProdAnchor] = useState({});

  const [isCriarFotosProdutoModalOpen, setIsCriarFotosProdutoModalOpen] = useState(false)

  const [isEditarEstoqueProdutoModalOpen, setIsEditarEstoqueProdutoModalOpen] = useState(false)

  const [isEditarProdutoModalOpen, setIsEditarProdutoModalOpen] = useState(false)

  const [isDeleteProdutoModalOpen, setIsDeleteProdutoModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias(currentPage);
        setCategorias(data.data);
        setFilteredCategorias(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };
    fetchCategorias();
  }, [currentPage]);

  useEffect(() => {
    // Filtra a lista de pessoas com base na consulta de busca
    setFilteredCategorias(
      categorias.filter((categoria) =>
        categoria.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categorias]);

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


  // Alternar visibilidade da lista de produtos por categoria
  const toggleCategoriaExpansion = async (categoriaId) => {
    const isExpanded = expandedCategorias.includes(categoriaId);

    if (isExpanded) {
      setExpandedCategorias(expandedCategorias.filter((id) => id !== categoriaId));
    } else {
      setExpandedCategorias([...expandedCategorias, categoriaId]);

      // Só busca se ainda não estiver carregado
      if (!produtosPorCategoria[categoriaId]) {
        try {
          const data = await getCatalogOrder();
          console.log(data)
          console.log(categoriaId)
          // Filtra apenas os produtos da categoria específica
          const produtosFiltrados = data
            .filter((item) => String(item.category_id) === String(categoriaId))
            .sort((a, b) => a.ordem - b.ordem);

          console.log(produtosFiltrados)
          setProdutosPorCategoria((prev) => ({
            ...prev,
            [categoriaId]: produtosFiltrados,
          }));
        } catch (error) {
          console.error("Erro ao buscar produtos do catálogo:", error);
        }
      }
    }
  };



  const handleCatalogOnDragEnd = async (result) => {
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
        const data = await getCategorias(currentPage);
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

  //search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //Modal
  const handlCriarCategoriaModalClose = () => {
    setIsCriarCategoriaModalOpen(false);
  };

  //funcao para atualizar a lista de categorias depois de uma nova categoria criada
  const handleNewCategoriaCreated = async () => {
    const data = await getCategorias(currentPage);
    setCategorias(data.data);
  };

  // Função para abrir o menu específico de cada categoria
  const handleMenuOpen = (event, categoria) => {
    setSelectedCategoria(categoria);
    setMenuAnchor(event.currentTarget);
  };

  // Função para abrir o modal de edição com a categoria correta
  const openEditarCategoriaModal = () => {
    setIsEditarCategoriaModalOpen(true);
    handleMenuClose(); // Fecha o menu antes de abrir o modal
  };

  // Função para fechar o menu categoria
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  //funcao para abrir o modal deletar categoria
  const openDeleteCategoriaModal = () => {
    setIsDeleteCategoriaModalOpen(true);
  };

  //funcao para atualizar a lista de categorias depois de editar categoria
  const handleCategoriaEdited = async () => {
    const data = await getCategorias(currentPage);
    setCategorias(data.data);
    setIsEditarCategoriaModalOpen(false)
  };

  //funcao para fechar o modal de deletar categoria
  const handleDeleteCategoriaModalClose = () => {
    setIsDeleteCategoriaModalOpen(false);
    setSelectedCategoriaId(null);
  };

  const openEditarEstoqueProdutoModal = (produto) => {
    setSelectedProduto(produto);
    setIsEditarEstoqueProdutoModalOpen(true);
  };

  const openDeleteProdutoModal = (produto) => {
    setSelectedProduto(produto);
    setIsDeleteProdutoModalOpen(true);
  };

  const openCriarFotosProdutoModal = (produto) => {
    setSelectedProduto(produto);
    setIsCriarFotosProdutoModalOpen(true);
  };

  //funcao para filtrar os produtos da categoria passada para filtrar
  const getProdutosByCategoria = (categoriaId) => {
    return [...(produtosPorCategoria[categoriaId] || [])];
  };


  //funcao para deletar categoria, unica que esta fora do modal, é uma boa depois colocar pra dentro do modal
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

  //abrir modal produto
  const openCriarProdutoModal = (categoria) => {
    setSelectedCategoria(categoria)
    setIsCriarProdutoModalOpen(true)
  }

  const openEditarProdutoModal = (produto, categoria) => {
    setSelectedCategoria(categoria);
    setSelectedProduto(produto);
    setIsEditarProdutoModalOpen(true);
  };

  //funcao para executar ao fechar o modal criar produto
  const handlCriarProdutoModalClose = async () => {
    setIsCriarProdutoModalOpen(false);

    try {
      const data = await getCatalogOrder();
      // Filtra apenas os produtos da categoria específica
      const produtosFiltrados = data
        .filter((item) => String(item.category_id) === String(selectedCategoria.id))
        .sort((a, b) => a.ordem - b.ordem);

      console.log(produtosFiltrados)
      setProdutosPorCategoria((prev) => ({
        ...prev,
        [selectedCategoria.id]: produtosFiltrados,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos do catálogo:", error);
    }
    setSelectedCategoria(null);

  };

  const handleEstoqueProdutoEdited = async () => {
    try {
      const data = await getCatalogOrder();
      // Filtra apenas os produtos da categoria específica
      const produtosFiltrados = data
        .filter((item) => String(item.category_id) === String(selectedCategoria.id))
        .sort((a, b) => a.ordem - b.ordem);

      console.log(produtosFiltrados)
      setProdutosPorCategoria((prev) => ({
        ...prev,
        [selectedCategoria.id]: produtosFiltrados,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos do catálogo:", error);
    }
    setIsEditarEstoqueProdutoModalOpen(false)
  };

  const handleNewFotoProdutoCreated = async () => {
    try {
      const data = await getCatalogOrder();
      // Filtra apenas os produtos da categoria específica
      const produtosFiltrados = data
        .filter((item) => String(item.category_id) === String(selectedCategoria.id))
        .sort((a, b) => a.ordem - b.ordem);

      console.log(produtosFiltrados)
      setProdutosPorCategoria((prev) => ({
        ...prev,
        [selectedCategoria.id]: produtosFiltrados,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos do catálogo:", error);
    }
  };

  //Entrando produto criado
  const handleNewProdutoCreated = async () => {
    console.log("handleNewProdutoCreated")
    try {
      const data = await getCatalogOrder();
      // Filtra apenas os produtos da categoria específica
      const produtosFiltrados = data
        .filter((item) => String(item.category_id) === String(selectedCategoria.id))
        .sort((a, b) => a.ordem - b.ordem);

      console.log(produtosFiltrados)
      setProdutosPorCategoria((prev) => ({
        ...prev,
        [selectedCategoria.id]: produtosFiltrados,
      }));
    } catch (error) {
      console.error("Erro ao buscar produtos do catálogo:", error);
    }
  };


  //salvar a nova ordem
  const handleProductOnDragEnd = async (result, categoriaId) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const produtosDaCategoria = getProdutosByCategoria(categoriaId);
    const [reorderedItem] = produtosDaCategoria.splice(sourceIndex, 1);
    produtosDaCategoria.splice(destinationIndex, 0, reorderedItem);

    // Atualiza o campo `ordem` com base na nova posição
    produtosDaCategoria.forEach((item, index) => {
      item.ordem = index + 1; // ou index, dependendo da lógica usada
    });

    console.log("Itens para enviar:", produtosDaCategoria);

    try {
      const response = await reordenarAllCategory(produtosDaCategoria);
      console.log(response);

      if (response.message === 'Ordem atualizada com sucesso') {
        try {
          const data = await getCatalogOrder();
          const produtosFiltrados = data
            .filter((item) => String(item.category_id) === String(categoriaId))
            .sort((a, b) => a.ordem - b.ordem);

          setProdutosPorCategoria((prev) => ({
            ...prev,
            [categoriaId]: produtosFiltrados,
          }));
        } catch (error) {
          console.error("Erro ao buscar produtos do catálogo:", error);
        }
        setIsReorderProductMode(false);
      } else {
        console.error("Erro inesperado ao atualizar a ordem dos produtos:", response.status);
      }
    } catch (error) {
      console.error("Erro ao atualizar a ordem dos produtos:", error);
    }
  };

  //abrir menu
  const openProductMenu = (event, produtoId) => {
    setMenuProdAnchor((prevState) => ({
      ...prevState,
      [produtoId]: event.currentTarget,
    }));
  };

  //fechar menu
  const closeProductMenu = (produtoId) => {
    setMenuProdAnchor((prevState) => ({
      ...prevState,
      [produtoId]: null,
    }));
  };

  const toggleProdutoStatus = async (produtoId) => {
    try {
      // Substituindo "produtos" por "produtosPorCategoria"
      const categoriaId = Object.keys(produtosPorCategoria).find((key) =>
        produtosPorCategoria[key].some((produto) => produto.id === produtoId)
      );
      
      if (!categoriaId) return;
  
      const produtoToUpdate = produtosPorCategoria[categoriaId].find((produto) => produto.id === produtoId);
  
      const newStatus = produtoToUpdate.status === "ativo" ? "inativo" : "ativo";
  
      // Atualizando o estado de produtos por categoria
      setProdutosPorCategoria((prev) => ({
        ...prev,
        [categoriaId]: prev[categoriaId].map((produto) =>
          produto.id === produtoId ? { ...produto, status: newStatus } : produto
        ),
      }));
  
      await changeProductStatus(produtoId, newStatus === "ativo");
    } catch (error) {
      console.error("Erro ao atualizar status da categoria:", error);
    }
  };
  
  return (
    <C.Container>

      <Container maxWidth="md">
        <Navbar />
        <Typography variant="h6" sx={{ textAlign: "center", my: 3 }}>Meu Catálogo</Typography>
        <C.SearchInput
          type="text"
          placeholder="Pesquisar por nome"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <Box display="flex" justifyContent="center" gap={2} my={2}>
          {!isReorderMode && (
            <Button size="medium" color="success" variant="contained" startIcon={<AddCircle />} onClick={() => setIsCriarCategoriaModalOpen(true)}>
              Categoria
            </Button>
          )}
          <Button size="medium" variant="outlined" endIcon={<Shuffle />} onClick={() => setIsReorderMode(!isReorderMode)}>
            {isReorderMode ? "Salvar Ordem" : "Reordenar"}
          </Button>
        </Box>

        {
          isReorderMode ? (
            <DragDropContext onDragEnd={handleCatalogOnDragEnd}>
              <Droppable droppableId="categorias">
                {(provided) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredCategorias
                      .sort((a, b) => (a.catalog_order || 0) - (b.catalog_order || 0))
                      .map((categoria, index) => (
                        <Draggable key={categoria.id} draggableId={String(categoria.catalog_order || index)} index={index}>
                          {(provided) => (

                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ my: 1, p: 2 }}>
                              <Typography variant="h6">{categoria.name}</Typography>
                              <C.ActionsWrapper>
                                <FaArrowsAlt style={{ color: "blue" }} />

                              </C.ActionsWrapper>
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
            filteredCategorias
              .sort((a, b) => a.catalog_order - b.catalog_order)
              .map((categoria) => (
                <C.Card key={categoria.id}>
                  <C.StatusWrapper>
                    <C.CategoriaLink
                      key={categoria.catalog_order}
                      onClick={() => toggleCategoriaExpansion(categoria.id)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      {categoria.name}
                      {expandedCategorias.includes(categoria.id) ? <FaAngleDown /> : <FaAngleRight />}
                    </C.CategoriaLink>
                    <C.ActionsWrapper>
                      <IconButton onClick={(event) => handleMenuOpen(event, categoria)}>
                        <FaEllipsisV />
                      </IconButton>
                      <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={() => setMenuAnchor(null)}
                      >
                        <MenuItem onClick={openEditarCategoriaModal}>
                          <FaEdit style={{ marginRight: 8 }} /> Editar
                        </MenuItem>
                        <MenuItem onClick={() => { openDeleteCategoriaModal(); setMenuAnchor(null); }}>
                          <FaTrashAlt style={{ marginRight: 8 }} /> Excluir
                        </MenuItem>
                      </Menu>
                      <C.ToggleSwitch>
                        <input
                          type="checkbox"
                          checked={categoria.status === "ativo"}
                          onChange={() => toggleCategoriaStatus(categoria.id)}
                        />
                        <C.Slider />
                      </C.ToggleSwitch>
                    </C.ActionsWrapper>
                  </C.StatusWrapper>
                  {expandedCategorias.includes(categoria.id) && (
                    <C.ProdutoList>
                      {isReorderProductMode ? (

                        <DragDropContext onDragEnd={(result) => handleProductOnDragEnd(result, categoria.id)}>
                          <Droppable droppableId={`produtos-${categoria.id}`}>
                            {(provided) => (
                              <div {...provided.droppableProps} ref={provided.innerRef}>
                                {produtosPorCategoria[categoria.id].map((produto, index) => (
                                  <Draggable key={produto.id} draggableId={`${produto.id}`} index={index}>
                                    {(provided) => (
                                      <Card
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        sx={{ my: 1, p: 2 }}
                                      >
                                        <Typography>{produto.titulo}</Typography>
                                      </Card>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>

                      ) : (
                        <>
                          {expandedCategorias.includes(categoria.id) && (
                            <Box sx={{ pl: 2, py: 1 }}>
                              {produtosPorCategoria[categoria.id] ? (
                                produtosPorCategoria[categoria.id].length > 0 ? (
                                  produtosPorCategoria[categoria.id].map((produto) => (
                                    <Card key={produto.id} sx={{ my: 1, p: 2 }}>
                                      <Typography variant="subtitle1">
                                        {produto.titulo || "Produto sem título"}
                                      </Typography>
                                      <span><FaBoxOpen />: {produto.estoque || 0}</span>
                                      <IconButton onClick={(event) => openProductMenu(event, produto.id)}>
                                        <FaEllipsisV />
                                      </IconButton>

                                      <Menu
                                        anchorEl={menuProdAnchor[produto.id]}
                                        open={Boolean(menuProdAnchor[produto.id])}
                                        onClose={() => closeProductMenu(produto.id)}
                                      >
                                        <MenuItem onClick={() => { setSelectedProduto(produto); openCriarFotosProdutoModal(produto); closeProductMenu(produto.id); }}>
                                          <FaImages style={{ marginRight: 8 }} /> Imagens
                                        </MenuItem>
                                        <MenuItem onClick={() => { setSelectedProduto(produto); openEditarEstoqueProdutoModal(produto); closeProductMenu(produto.id); }}>
                                          <FaBoxOpen style={{ marginRight: 8 }} /> Estoque
                                        </MenuItem>
                                        { produto.tipo ==='produto' ? (
                                        <MenuItem onClick={() => { setSelectedProduto(produto); navigate(`/produto/${produto.referencia_id}/edit`) }}>
                                         <FaEdit style={{ marginRight: 8 }} />Editar Produto
                                        </MenuItem>
                                        ):(
                                        <MenuItem onClick={() => { setSelectedProduto(produto); navigate(`/combo/${produto.referencia_id}/edit`) }}>
                                         <FaEdit style={{ marginRight: 8 }} />Editar combo
                                        </MenuItem>

                                        )}
                                        <MenuItem onClick={() => { setSelectedProduto(produto); openDeleteProdutoModal(produto); closeProductMenu(produto.id); }}>
                                          <FaTrashAlt style={{ marginRight: 8 }} /> Excluir
                                        </MenuItem>
                                      </Menu>

                                      <C.ToggleSwitch>
                                        <input
                                          type="checkbox"
                                          checked={produto.status === "ativo"}
                                          onChange={() => toggleProdutoStatus(produto.id)}
                                        />
                                        <C.Slider />
                                      </C.ToggleSwitch>
                                    </Card>
                                  ))
                                ) : (
                                  <Typography variant="body2">Nenhum produto nesta categoria.</Typography>
                                )
                              ) : (
                                <Typography variant="body2" color="text.secondary">Carregando produtos...</Typography>
                              )}
                            </Box>
                          )}
                        </>
                      )}
                      {!isReorderProductMode &&
                        <>
                          <Button color="success" size="small" variant="contained" onClick={() => openCriarProdutoModal(categoria)} startIcon={<AddCircle />}> Novo Produto</Button>
                          <Button color="success" size="small" variant="contained" onClick={() => navigate(`produto/category/${categoria.id}`)} startIcon={<AddCircle />}> Novo Combo</Button>
                        </>
                      }
                      <Button size="small" onClick={() => setIsReorderProductMode(!isReorderProductMode)} endIcon={<Shuffle />}>
                        {isReorderProductMode ? "Salvar Ordem" : "Reordenar"}
                      </Button>
                    </C.ProdutoList>
                  )}
                </C.Card>
              ))
          )}
        <C.PaginationContainer>
          <C.PageButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaAngleLeft />
          </C.PageButton>

          <span>Página {currentPage} de {totalPages}</span>

          <C.PageButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FaAngleRight />
          </C.PageButton>
        </C.PaginationContainer>

        {/*modais*/}
        {/*Nova categoria*/}
        <CriarCategoriaModal
          isOpen={isCriarCategoriaModalOpen}
          onClose={handlCriarCategoriaModalClose}
          onCreate={handleNewCategoriaCreated}
        />
        {/*Editar Categoria*/}
        <EditCategoriaModal
          isOpen={isEditarCategoriaModalOpen}
          onClose={() => setIsEditarCategoriaModalOpen(false)}
          categoria={selectedCategoria}
          onEdit={handleCategoriaEdited}
        />
        {/*Deletar Categoria*/}
        <DeleteCategoriaModal
          isOpen={isDeleteCategoriaModalOpen}
          onClose={handleDeleteCategoriaModalClose}
          onDelete={handleDeleteCategoria}
          categoria={selectedCategoria}
        />
        {/*Criar produto*/}
        <CriarProdutoModal
          isOpen={isCriarProdutoModalOpen}
          onClose={handlCriarProdutoModalClose}
          onCreate={handleNewProdutoCreated}
          categoria={selectedCategoria}
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
    </C.Container>
  );
};

export default Catalogo;
