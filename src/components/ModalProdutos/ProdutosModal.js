import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import categoriaApi from "../../services/categoriaApi";
import productApi from "../../services/productApi";
import * as C from "./styles";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaEllipsisV, FaBoxOpen, FaAngleLeft, FaAngleRight, FaAngleDown } from 'react-icons/fa'; // Ícone de lápis

const ProdutosModal = ({ isOpen, onClose, adicionarProdutoAoCombo }) => {

  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [expandedCategorias, setExpandedCategorias] = useState([]); // Para controlar categorias expandidas
  const { getCategorias } = categoriaApi();
  const { getProducts } = productApi();
  //search
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a consulta de busca
  //paginacao
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Filtra a lista de pessoas com base na consulta de busca
    setFilteredCategorias(
      categorias.filter((categoria) =>
        categoria.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, categorias]);

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
  }, [currentPage]);

  const handleProdutoClick = (produto) => {
    adicionarProdutoAoCombo(produto); // Adiciona ao combo
    onClose(); // Fecha o modal se quiser
  };

  // Filtrar produtos pela categoria
  const getProdutosByCategoria = (categoriaId) => {
    return produtos.filter((produto) => produto.category_id === categoriaId); // Certifique-se que `categoriaId` seja a chave correta
  };

  // Função para abrir o menu específico de cada categoria
  const handleMenuOpen = (event, categoria) => {
    setSelectedCategoria(categoria);
  };

  //search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Alternar visibilidade da lista de produtos por categoria
  const toggleCategoriaExpansion = (categoriaId) => {
    if (expandedCategorias.includes(categoriaId)) {
      setExpandedCategorias(expandedCategorias.filter((id) => id !== categoriaId));
    } else {
      setExpandedCategorias([...expandedCategorias, categoriaId]);
    }
  };

  if (!isOpen) return null;



  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Selecione o produto </DialogTitle>
      <DialogContent>
        <C.SearchInput
          type="text"
          placeholder="Pesquisar por nome"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {filteredCategorias
          .sort((a, b) => a.catalog_order - b.catalog_order)
          .map((categoria) => (
            <C.Card key={categoria.id}>
              <C.CategoriaLink
                onClick={() => toggleCategoriaExpansion(categoria.id)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                {categoria.name}
                {expandedCategorias.includes(categoria.id) ? <FaAngleDown /> : <FaAngleRight />}
              </C.CategoriaLink>
              {expandedCategorias.includes(categoria.id) && (
                <C.ProdutoList>
                  {getProdutosByCategoria(categoria.id).map((produto) => (
                    <C.ProdutoActions key={produto.id}>
                      <C.ProdutoItem>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{produto.titulo}</span>
                        </div>
                        <Button
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => handleProdutoClick(produto)}
                        >
                          Adicionar
                        </Button>
                      </C.ProdutoItem>
                    </C.ProdutoActions>
                  ))}
                </C.ProdutoList>
              )}
            </C.Card>
          ))}
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
        <Button onClick={onClose} color="error" variant="outlined">
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProdutosModal;
