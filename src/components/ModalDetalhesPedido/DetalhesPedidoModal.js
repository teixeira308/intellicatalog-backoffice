import React, { useState, useEffect } from "react";
import * as C from "./styles";
import { NumericFormat } from "react-number-format";
import "./styles.css";
import productApi from "../../services/productApi";

const DetalhespedidoModal = ({ isOpen, onClose, pedido }) => {
  const { getProducts } = productApi();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProducts();
        setProdutos(data.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  if (!isOpen) return null;

  // Função para encontrar produto pelo ID
  const getProdutoDetalhes = (productId) => {
    return produtos.find((produto) => produto.id === productId);
  };

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Pedido #{pedido.id}</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm>
          {/* Informações do Pedido */}
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Data do Pedido</C.Label>{" "}
              {new Date(pedido.order_date).toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </C.FormColumn>
            <C.FormColumn>
              <C.Label>Telefone</C.Label>
              {pedido.phone}
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Endereço de Entrega</C.Label>
              {pedido.delivery_address}
            </C.FormColumn>
            <C.FormColumn>
              <C.Label>Total do Pedido</C.Label>
              {pedido.total_amount}
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Notas</C.Label>
              {pedido.notes || "Nenhuma nota"}
            </C.FormColumn>
          </C.FormRow>

          {/* Itens do Pedido */}
          <C.FormRow>
            <C.FormColumn>
              <C.Label>Itens do Pedido</C.Label>
              {pedido.items.map((item, index) => {
                const produto = getProdutoDetalhes(item.product_id);
                return (
                  <c.Card key={index} style={{ marginBottom: "1rem" }}>
                    {produto ? (
                      <>
                        <p>
                          <strong>Produto:</strong> {produto.titulo}
                        </p>
                        <p>
                          <strong>Marca:</strong> {produto.brand}
                        </p>
                        <p>
                          <strong>Quantidade:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong>Preço Unitário:</strong>{" "}
                          <NumericFormat
                            value={item.unit_price}
                            displayType="text"
                            thousandSeparator
                            prefix="R$ "
                          />
                        </p>
                        <p>
                          <strong>Total:</strong>{" "}
                          <NumericFormat
                            value={item.total_price}
                            displayType="text"
                            thousandSeparator
                            prefix="R$ "
                          />
                        </p>
                      </>
                    ) : (
                      <p>Produto não encontrado.</p>
                    )}
                  </c.Card>
                );
              })}
            </C.FormColumn>
          </C.FormRow>

          <C.Button onClick={onClose}>Fechar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DetalhespedidoModal;
