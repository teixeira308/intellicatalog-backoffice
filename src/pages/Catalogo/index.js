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

import { FaEdit, FaTrashAlt,FaImages } from 'react-icons/fa'; // Ícone de lápis

const Catalogo = () => {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const { getCategorias, changeStatus, deleteCategoria } = categoriaApi();
  const { getProducts, deleteProduto } = productApi();
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [expandedCategorias, setExpandedCategorias] = useState([]); // Para controlar categorias expandidas
  const [isEditarCategoriaModalOpen, setIsEditarCategoriaModalOpen] = useState(false);
  const [isCriarCategoriaModalOpen, setIsCriarCategoriaModalOpen] = useState(false);
  const [isDeleteCategoriaModalOpen, setIsDeleteCategoriaModalOpen] = useState(false);
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
  const [isEditarProdutoModalOpen,setIsEditarProdutoModalOpen] = useState(false)

  const [isCriarFotosProdutoModalOpen, setIsCriarFotosProdutoModalOpen] = useState(false)
  const [isCriarProdutoModalOpen, setIsCriarProdutoModalOpen] = useState(false);


  const [isDeleteProdutoModalOpen, setIsDeleteProdutoModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data.data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    const fetchProdutos = async () => {
      try {
        const data = await getProducts();
        setProdutos(data.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchCategorias();
    fetchProdutos();
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

  const openEditarCategoriaModal = (categoria) => {
    setSelectedCategoria(categoria);
    setIsEditarCategoriaModalOpen(true);
  };

  const openEditarProdutoModal = (produto,categoria) => {
    setSelectedCategoria(categoria);
    setSelectedProduto(produto);
    setIsEditarProdutoModalOpen(true);
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

  const openCriarProdutoModal = (categoria) =>{
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

  return (
    <C.Container>
      <Navbar />
      <C.Title>Meu catálogo</C.Title>
      <C.CreateButton onClick={() => setIsCriarCategoriaModalOpen(true)}>+</C.CreateButton>
      {categorias.map((categoria) => (
        <C.Card key={categoria.id}>
          <C.StatusWrapper>
            {/* Transformar o nome da categoria em um link */}
            <C.CategoriaLink onClick={() => toggleCategoriaExpansion(categoria.id)}>
              {categoria.name}
            </C.CategoriaLink>

            <C.ActionsWrapper>
              <C.EditButton onClick={() => openEditarCategoriaModal(categoria)}>
                <FaEdit />
              </C.EditButton>
              <C.TrashButton onClick={() => openDeleteCategoriaModal(categoria)}>
                <FaTrashAlt />
              </C.TrashButton>
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

          {/* Mostrar produtos somente se a categoria estiver expandida */}
          {expandedCategorias.includes(categoria.id) && (
            <C.ProdutoList>
              {getProdutosByCategoria(categoria.id).map((produto) => (
                <C.ProdutoActions key={produto.id}>
                  <C.ProdutoItem>{produto.titulo} </C.ProdutoItem>
                  <div>
                  <C.EditButton onClick={() => openCriarFotosProdutoModal(produto)}>
                    <FaImages />
                  </C.EditButton>
                  &nbsp; &nbsp;
                  <C.EditButton onClick={() => openEditarProdutoModal(produto,categoria)}>
                    <FaEdit />
                  </C.EditButton>
                  &nbsp; &nbsp;
                  <C.TrashButton onClick={() => openDeleteProdutoModal(produto)}>
                    <FaTrashAlt />
                  </C.TrashButton>
                  </div>
                </C.ProdutoActions>
              ))}
              <C.CreateButton onClick={() => openCriarProdutoModal(categoria)}>+</C.CreateButton>
            </C.ProdutoList>
          )}

        </C.Card>
      ))}

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

    <CriarFotosProdutoModal
        isOpen={isCriarFotosProdutoModalOpen}
        onClose={() => setIsCriarFotosProdutoModalOpen(false)}
        categoria={selectedCategoria}
        produto={selectedProduto}
        onCreate={handleNewFotoProdutoCreated}
      />

    </C.Container>
  );
};

export default Catalogo;
