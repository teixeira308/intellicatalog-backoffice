import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaWhatsapp, FaPlusCircle, FaRandom, FaSearch } from 'react-icons/fa'; // Ícone de lápis
import Navbar from "../../components/Navbar/Navbar";
import PedidoApi from "../../services/PedidoApi";
import DetalhesPedidoModal from "../../components/ModalDetalhesPedido/DetalhesPedidoModal";
import DeletarPedidoModal from "../../components/ModalDeletePedido/DeletePedidoModal";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { getPedidos, deletarPedido } = PedidoApi();
  const [isDetalhesPedidoModalOpen, setIsDetalhesPedidoModalOpen] = useState(false);
  const [isDeletarPedidoModalOpen, setIsDeletarPedidoModalOpen] = useState(false);
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
        setProdutos(pedidos.filter((pedido) => pedido.id !== selectedPedido.id));
      }
      handleDeletarPedidoModalClose();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };


  const openDetalhesPedidoModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsDetalhesPedidoModalOpen(true);
  };

  const handleDeletarPedidoModalClose = () => {
    setIsDeletarPedidoModalOpen(false);
    setSelectedPedido(null);
  };

  return (
    <C.Container>
      <Navbar />
      <C.Title>Pedidos</C.Title>
       <C.ButtonGroup>
                  <C.CreateButton>
                    <FaPlusCircle /> Novo Pedido
                  </C.CreateButton>
                  <C.ReordButton>
                    <FaRandom/>Reordenar
                  </C.ReordButton>
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
                    <C.EditButton onClick={() => { openDetalhesPedidoModal(pedido);} } >
                      <FaSearch /> Detalhes
                    </C.EditButton>
                    <C.EditButton>
                      <FaEdit /> Editar
                    </C.EditButton>
                    <C.TrashButton >
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
    </C.Container>
    
  );
};

export default Pedidos;
