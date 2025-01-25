import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaWhatsapp, FaPlusCircle, FaRandom, FaSearch } from 'react-icons/fa'; // Ícone de lápis
import Navbar from "../../components/Navbar/Navbar";
import PedidoApi from "../../services/PedidoApi";
import DetalhesPedidoModal from "../../components/ModalDetalhesPedido/DetalhesPedidoModal";
import DeletarPedidoModal from "../../components/ModalDeletePedido/DeletePedidoModal";
import EditarPedidoModal from "../../components/ModalEditarPedido/EditarPedidoModal";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { getPedidos, deletarPedido } = PedidoApi();
  const [isDetalhesPedidoModalOpen, setIsDetalhesPedidoModalOpen] = useState(false);
  const [isDeletarPedidoModalOpen, setIsDeletarPedidoModalOpen] = useState(false);
  const [isEditarPedidoModalOpen, setIsEditarPedidoModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidos = await getPedidos(); // Recebe o objeto completo retornado
        if (pedidos) {
          setPedidos(pedidos); // Define diretamente o retorno
        }
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error.message);
      }
    };

    fetchPedidos();
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


  const openDetalhesPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsDetalhesPedidoModalOpen(true);
  };

  const openDeletarPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsDeletarPedidoModalOpen(true);
  };
  
  const openEditarPedidoModal = (pedido) =>{
    setSelectedPedido(pedido);
    setIsEditarPedidoModalOpen(true);
  }

  const handleDeletarPedidoModalClose = () => {
    setIsDeletarPedidoModalOpen(false);
    setSelectedPedido(null);
  };

  const handlePedidoEdited = async () => {
    const data = await getPedidos();
    setPedidos(data.data);
    setIsEditarPedidoModalOpen(false)
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>Pedidos</C.Title>
       <C.ButtonGroup>
                  <C.CreateButton>
                    <FaPlusCircle /> Novo Pedido
                  </C.CreateButton>
                </C.ButtonGroup>
      <C.Section>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <C.Card key={pedido.id || index}>
              <C.CardHeader>
                <C.CardTitle>#{pedido.id}</C.CardTitle>
                <C.CardStatus>
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
                  <strong>Total:</strong>{" "}
                  R${pedido.total_amount}
                </C.CardDetail>
                <C.CardDetail>
                  <C.ButtonGroup>
                    <C.ReordButton onClick={() => { openDetalhesPedidoModal(pedido);} } >
                      <FaSearch /> Detalhes
                    </C.ReordButton>
                    <C.EditButton onClick={() => { openEditarPedidoModal(pedido);} } >
                      <FaEdit /> Editar
                    </C.EditButton>
                    <C.TrashButton  onClick={() => { openDeletarPedidoModal(pedido); }} >
                      <FaTrashAlt /> Excluir
                    </C.TrashButton>
                  </C.ButtonGroup>
                </C.CardDetail>
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
        produto={selectedPedido}
        onEdit={handlePedidoEdited}
      />

    </C.Container>
    
  );
};

export default Pedidos;
