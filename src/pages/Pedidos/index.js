import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { NumericFormat } from "react-number-format";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaWhatsapp, FaPlusCircle, FaRandom, FaSearch } from 'react-icons/fa'; // Ícone de lápis
import Navbar from "../../components/Navbar/Navbar";
import PedidoApi from "../../services/PedidoApi";
import productApi from "../../services/productApi";
import DetalhesPedidoModal from "../../components/ModalDetalhesPedido/DetalhesPedidoModal";
import DeletarPedidoModal from "../../components/ModalDeletePedido/DeletePedidoModal";
import EditarPedidoModal from "../../components/ModalEditarPedido/EditarPedidoModal";
import DeletarItemPedidoModal from "../../components/ModalDeleteItemPedido/DeleteItemPedidoModal";
import CriarPedidoModal from "../../components/ModalCriarPedido/CriarPedidoModal";
import AdicionarItemModal from "../../components/ModalAdicionarItem/AdicionarItemModal";
import MudarStatusPedidoModal from "../../components/ModalMudarPedidosStatus/MudarStatusPedidosModal";
import { Container, Button, Card, CardContent, Typography, IconButton, Switch, Menu, MenuItem, Box } from "@mui/material";
import { AddCircle, MoreVert, Edit, Delete, Image, Inventory, Shuffle } from "@mui/icons-material";


const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { getPedidos, deletarPedido, deletarItemPedido } = PedidoApi();
  const [isDetalhesPedidoModalOpen, setIsDetalhesPedidoModalOpen] = useState(false);
  const [isDeletarPedidoModalOpen, setIsDeletarPedidoModalOpen] = useState(false);
  const [isDeletarItemPedidoModalOpen, setIsDeletarItemPedidoModalOpen] = useState(false);
  const [isEditarPedidoModalOpen, setIsEditarPedidoModalOpen] = useState(false);
  const [isCriarPedidoModalOpen, setIsCriarPedidoModalOpen] = useState(false);
  const [isAdicionarItemPedidoModalOpen, setIsAdicionarItemPedidoModalOpen] = useState(false);
  const [isMudarStatusPedidoModalOpen, setIsMudarStatusPedidoModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const { getProducts } = productApi();
  const [expandedPedidoId, setExpandedPedidoId] = useState(null); // Controla qual pedido está expandido


  useEffect(() => {
    const fetchPedidosEProdutos = async () => {
      try {
        const pedidos = await getPedidos();
        const produtos = await getProducts();
        setPedidos(pedidos);
        setProdutos(produtos.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error.message);
      }
    };

    fetchPedidosEProdutos();
  }, []);

  const handleDeletarPedido = async () => {
    try {
      if (selectedPedido) {
        await deletarPedido(selectedPedido);
        setPedidos(pedidos.filter((pedido) => pedido.id !== selectedPedido.id));
      }
      handleDeletarPedidoModalClose();
    } catch (error) {
      console.error("Erro ao deletar Pedido:", error);
    }
  };

  const handleDeletarItemPedido = async () => {
    try {
      if (selectedPedido && selectedItem) {
        await deletarItemPedido(selectedPedido, selectedItem);
        setPedidos(pedidos.filter((pedido) => pedido.id !== selectedPedido.id));
      }
      handleDeletarItemPedidoModalClose();
    } catch (error) {
      console.error("Erro ao deletar Pedido:", error);
    }
  };

  const handlCriarPedidoModalClose = async () => {
    setIsCriarPedidoModalOpen(false);
    const data = await getPedidos();
    setPedidos(data);
  };

  const handleNewPedidoCreated = async () => {
    const data = await getPedidos();
    setPedidos(data);
  };

  const handleAdicionarItemPedidoModalClose = async () => {
    setIsAdicionarItemPedidoModalOpen(false)
    const data = await getPedidos();
    setPedidos(data);
  };

  const openDetalhesPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsDetalhesPedidoModalOpen(true);
  };

  const openDeletarPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsDeletarPedidoModalOpen(true);
  };

  const openDeletarItemPedidoModal = (pedido, item) => {

    setSelectedPedido(pedido);
    setSelectedItem(item);
    setIsDeletarItemPedidoModalOpen(true);
  };

  const openAdicionarItemPedidoModal = (pedido) => {

    setSelectedPedido(pedido);
    setIsAdicionarItemPedidoModalOpen(true);
  };

  const openEditarPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsEditarPedidoModalOpen(true);
  }

  const openMudarStatusPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsMudarStatusPedidoModalOpen(true);
  }

  const openCriarPedidoModal = () => {

    setIsCriarPedidoModalOpen(true)
  }


  const togglePedidoItems = (pedidoId) => {
    setExpandedPedidoId(expandedPedidoId === pedidoId ? null : pedidoId);
  };

  const getProdutoDetalhes = (productId) => {
    return produtos.find((produto) => produto.id === productId);
  };


  const handleDeletarPedidoModalClose = () => {
    setIsDeletarPedidoModalOpen(false);
    setSelectedPedido(null);
  };

  const handleDeletarItemPedidoModalClose = () => {
    setIsDeletarItemPedidoModalOpen(false);
    setSelectedPedido(null);
    setSelectedItem(null);
    handlePedidoEdited();
  };

  const handlePedidoEdited = async () => {
    const data = await getPedidos();
    setPedidos(data);
    setIsEditarPedidoModalOpen(false)
  };

  const handleStatusPedidoEdited = async () => {
    const data = await getPedidos();
    setPedidos(data);
    setIsEditarPedidoModalOpen(false)
  };

  return (
    <C.Container>
      <Container maxWidth="md">
        <Navbar />

        <Typography variant="h6" sx={{ textAlign: "center", my: 3 }}>Pedidos</Typography>

        <Box display="flex" justifyContent="center" gap={2} my={2}>

          <Button size="medium" color="success" variant="contained" startIcon={<AddCircle />} onClick={() => openCriarPedidoModal()}>
            Novo Pedido
          </Button>


        </Box>

        <C.Section>
          {pedidos.length > 0 ? (
            pedidos.map((pedido, index) => (
              <C.Card key={pedido.id || index}>
                <C.CardHeader>
                  <C.CardTitle>#{pedido.id}</C.CardTitle>
                  <C.CardStatus
                    status={pedido.status}
                    onClick={() => openMudarStatusPedidoModal(pedido)}
                  >
                    {pedido.status}
                  </C.CardStatus>

                </C.CardHeader>
                <C.CardBody>
                  <C.CardDetail>
                    <strong>Cliente:</strong>{" "}
                    {pedido.phone}
                  </C.CardDetail>
                  <C.CardDetail>
                    <strong>Criado em:</strong> {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    }).format(new Date(pedido.order_date))}
                  </C.CardDetail>
                  <C.CardDetail>
                    <strong>Entrega em:</strong> {new Intl.DateTimeFormat("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    }).format(new Date(pedido.data_entrega))}
                  </C.CardDetail>
                  <C.CardDetail>
                    <strong>Total:</strong>{" "}
                    R${pedido.total_amount}
                  </C.CardDetail>
                  <C.CardDetail>
                   
                    <C.ButtonGroup>


                      {/*} <C.ReordButton onClick={() => { openDetalhesPedidoModal(pedido); }} >
                        <FaSearch /> Detalhes
                      </C.ReordButton>{*/}
                      <Button size="small" color="success" variant="contained" startIcon={<FaSearch />} onClick={() => openDetalhesPedidoModal(pedido)}>
                        Detalhes
                      </Button>
                      {/*} <C.EditButton onClick={() => { openEditarPedidoModal(pedido); }} >
                        <FaEdit /> Editar
                      </C.EditButton>{*/}
                      <Button size="small" color="primary" variant="contained" startIcon={<FaEdit />} onClick={() => openEditarPedidoModal(pedido)}>
                        Editar
                      </Button>
                      {/*}  <C.TrashButton onClick={() => { openDeletarPedidoModal(pedido); }} >
                        <FaTrashAlt /> Excluir
                      </C.TrashButton>{*/}
                      <Button size="small" color="error" variant="contained" startIcon={<Delete />} onClick={() => openDeletarPedidoModal(pedido)}>
                        Deletar
                      </Button>
                    </C.ButtonGroup>
                    <C.ButtonGroup>
                      {/*} <C.ReordButton onClick={() => togglePedidoItems(pedido.id)}>
                        {expandedPedidoId === pedido.id ? "Ocultar Itens" : "Ver Itens"}
                      </C.ReordButton>{*/}
                      <Button size="small" color="primary" variant="contained" onClick={() => togglePedidoItems(pedido.id)}>
                        {expandedPedidoId === pedido.id ? "Ocultar Itens" : "Ver Itens"}
                      </Button>
                    </C.ButtonGroup>
                  </C.CardDetail>
                  {expandedPedidoId === pedido.id && (
                    <>
                    {/*}  <C.CreateButton onClick={() => { openAdicionarItemPedidoModal(pedido); }}>
                        <FaPlusCircle /> Produto
                      </C.CreateButton>{*/}
                     

                      {pedido.items.map((item, idx) => {
                        const produto = getProdutoDetalhes(item.product_id);
                        return (
                          <C.Card key={idx}>
                            {produto ? (
                              <C.CardBody>
                                <C.CardDetail> <strong>Produto:</strong> {produto.titulo}    <strong>Marca:</strong> {produto.brand}</C.CardDetail>
                                <C.CardDetail><strong>Quantidade:</strong> {item.quantity}   <strong>Preço Unitário:</strong>{" "}
                                  <NumericFormat
                                    value={item.unit_price}
                                    displayType="text"
                                    thousandSeparator
                                    prefix="R$ "
                                  />
                                </C.CardDetail>
                                <C.CardDetail> <strong>Total:</strong>{" "}
                                  <NumericFormat
                                    value={item.total_price}
                                    displayType="text"
                                    thousandSeparator
                                    prefix="R$ "
                                  /></C.CardDetail>
                                {/*} <C.TrashButton onClick={() => { openDeletarItemPedidoModal(pedido, produto); }}>
                                  <FaTrashAlt />
                                </C.TrashButton> {*/}
                                <Button size="small" color="error" variant="contained" startIcon={<Delete />} onClick={() => openDeletarItemPedidoModal(pedido, produto)}>
                                  Deletar
                                </Button>
                              </C.CardBody>
                            ) : (
                              <p>Pedido sem produtos.</p>
                            )}
                            
                          </C.Card>
                          
                        );
                      })}
                      <Button size="medium" color="success" variant="contained" startIcon={<AddCircle />} onClick={() => openAdicionarItemPedidoModal(pedido)}>
                        Item
                      </Button>
                    </>
                  )}
                   
                </C.CardBody>

              </C.Card>
            ))
          ) : (
            <p>Nenhum pedido encontrado.</p>
          )}
        </C.Section>
        <DetalhesPedidoModal
          isOpen={isDetalhesPedidoModalOpen}
          onClose={() => setIsDetalhesPedidoModalOpen(false)}
          pedido={selectedPedido}
        />


        <DeletarPedidoModal
          isOpen={isDeletarPedidoModalOpen}
          onClose={handleDeletarPedidoModalClose}
          onDelete={handleDeletarPedido}
          pedido={selectedPedido}
        />

        <EditarPedidoModal
          isOpen={isEditarPedidoModalOpen}
          onClose={() => setIsEditarPedidoModalOpen(false)}
          pedido={selectedPedido}
          onEdit={handlePedidoEdited}
        />

        <DeletarItemPedidoModal
          isOpen={isDeletarItemPedidoModalOpen}
          onClose={handleDeletarItemPedidoModalClose}
          onDelete={handleDeletarItemPedido}
          pedido={selectedPedido}
          item={selectedItem}
        />

        <CriarPedidoModal
          isOpen={isCriarPedidoModalOpen}
          onClose={handlCriarPedidoModalClose}
          onCreate={handleNewPedidoCreated}
        />

        <AdicionarItemModal
          isOpen={isAdicionarItemPedidoModalOpen}
          onClose={handleAdicionarItemPedidoModalClose}
          onCreate={handleNewPedidoCreated}
          orderId={selectedPedido}
        />

        <MudarStatusPedidoModal
          isOpen={isMudarStatusPedidoModalOpen}
          onClose={() => setIsMudarStatusPedidoModalOpen(false)}
          pedido={selectedPedido}
          onEdit={handleStatusPedidoEdited}
        />
      </Container>
    </C.Container>

  );
};

export default Pedidos;
