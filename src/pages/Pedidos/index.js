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
              <p>Cliente: {pedido.cliente}</p>
              <p>Total: {pedido.total}</p>
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
