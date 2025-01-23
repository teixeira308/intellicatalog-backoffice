import React, { useState, useEffect } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import PedidoApi from "../../services/PedidoApi";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { getPedidos } = PedidoApi();

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

  return (
    <C.Container>
      <Navbar />
      <C.Title>Pedidos</C.Title>
      <C.Section>
        {pedidos.length > 0 ? (
          pedidos.map((pedido, index) => (
            <C.Card key={pedido.id || index}>
              <p>ID do Pedido: {pedido.id}</p>
              <p>Data do pedido: {pedido.order_date}</p>
              <p>Método de pagamento: {pedido.payment_method}</p>
              <p>Status: {pedido.status}</p>
              <p>Observação: {pedido.notes}</p>
              <p>Endereço: {pedido.delivery_address}</p>
              <p>Cliente: {pedido.phone}</p>
              <p>Total: R${pedido.total_amount}</p>
              {/* Adicione mais campos conforme necessário */}
            </C.Card>
          ))
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
      </C.Section>
    </C.Container>
  );
};

export default Pedidos;
