import React, { useState, useEffect } from "react";
import * as C from "./styles";
import productApi from "../../services/productApi";
import categoriaApi from "../../services/categoriaApi";
import PedidoApi from "../../services/PedidoApi";

const AdicionarItemModal = ({ isOpen, onClose, onCreate, orderId }) => {
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const { getCategorias } = categoriaApi();
  const { getProducts } = productApi();
  const {addItemPedido} = PedidoApi();

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

  const handleIncreaseQuantity = (productId, unitPrice) => {
    setQuantidades((prev) => ({
      ...prev,
      [productId]: {
        quantity: (prev[productId]?.quantity || 0) + 1,
        unitPrice,
        totalPrice: ((prev[productId]?.quantity || 0) + 1) * unitPrice,
      },
    }));
  };

  const handleDecreaseQuantity = (productId, unitPrice) => {
    setQuantidades((prev) => {
      const currentQuantity = prev[productId]?.quantity || 0;
      if (currentQuantity === 0) return prev;

      return {
        ...prev,
        [productId]: {
          quantity: currentQuantity - 1,
          unitPrice,
          totalPrice: (currentQuantity - 1) * unitPrice,
        },
      };
    });
  };

  const handleSubmit = async () => {
    const items = Object.entries(quantidades)
      .filter(([_, data]) => data.quantity > 0)
      .map(([productId, data]) => ({
        order_id: orderId.id,
        product_id: parseInt(productId, 10),
        quantity: data.quantity,
        unit_price: data.unitPrice,
        total_price: data.totalPrice,
      }));

    
    if (items.length === 0) {
      alert("Nenhum item foi selecionado.");
      return;
    }

    try {
      await addItemPedido({ items },orderId.id);
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
          {categorias
            .filter((categoria) =>
              produtos.some((produto) => produto.category_id === categoria.id)
            )
            .map((categoria) => (
              <div key={categoria.id}>
                <h3>{categoria.name}</h3>
                {produtos
                  .filter((produto) => produto.category_id === categoria.id)
                  .map((produto) => (
                    <C.ProductRow key={produto.id}>
                      <C.ProductName>{produto.titulo}</C.ProductName>
                      <C.QuantityControls>
                        <C.QuantityButton
                          onClick={() =>
                            handleDecreaseQuantity(produto.id, produto.price)
                          }
                        >
                          -
                        </C.QuantityButton>
                        <C.QuantityValue>
                          {quantidades[produto.id]?.quantity || 0}
                        </C.QuantityValue>
                        <C.QuantityButton
                          onClick={() =>
                            handleIncreaseQuantity(produto.id, produto.price)
                          }
                        >
                          +
                        </C.QuantityButton>
                      </C.QuantityControls>
                      <C.ProductPrice>
                        Total: R${" "}
                        {(
                          quantidades[produto.id]?.totalPrice || 0
                        )}
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
