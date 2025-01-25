import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";
import categoriaApi from "../../services/categoriaApi";

const AdicionarItemModal = ({ isOpen, onClose, onCreate, orderId }) => {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const { getCategorias } = categoriaApi();
  const { getProducts, addItemPedido } = productApi();

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

  const handleIncreaseQuantity = (productId) => {
    setQuantidades((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (productId) => {
    setQuantidades((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const handleSubmit = async () => {
    const items = Object.entries(quantidades)
      .filter(([_, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const produto = produtos.find((p) => p.id === parseInt(productId, 10));
        return {
          order_id: orderId,
          product_id: produto.id,
          quantity,
          unit_price: produto.price,
          total_price: (produto.price * quantity).toFixed(2),
        };
      });

    if (items.length === 0) {
      alert("Nenhum item foi selecionado.");
      return;
    }

    try {
      await addItemPedido(orderId,{ items });
      alert("Itens adicionados com sucesso!");
      onCreate();
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar itens:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Adicionar Itens ao Pedido</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalBody>
          {categorias.map((categoria) => (
            <div key={categoria.id}>
              <h3>{categoria.name}</h3>
              {produtos
                .filter((produto) => produto.category_id === categoria.id)
                .map((produto) => (
                  <C.ProductRow key={produto.id}>
                    <C.ProductName>{produto.titulo}</C.ProductName>
                    <C.QuantityControls>
                      <C.QuantityButton onClick={() => handleDecreaseQuantity(produto.id)}>-</C.QuantityButton>
                      <C.QuantityValue>{quantidades[produto.id] || 0}</C.QuantityValue>
                      <C.QuantityButton onClick={() => handleIncreaseQuantity(produto.id)}>+</C.QuantityButton>
                    </C.QuantityControls>
                    <C.ProductPrice>
                      R$ {produto.price}
                    </C.ProductPrice>
                  </C.ProductRow>
                ))}
            </div>
          ))}
        </C.ModalBody>
        <C.ModalFooter>
          <C.Button onClick={handleSubmit}>Adicionar Itens ao Pedido</C.Button>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default AdicionarItemModal;
