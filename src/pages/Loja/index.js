import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import LojaApi from "../../services/lojaApi";
import EditLojaModal from "../../components/ModalEditarLoja/EditarLojaModal";

import { FaEdit } from 'react-icons/fa'; // Importa o ícone de lápis


const Loja = () => {
  const [stores, setStores] = useState([]);

  const [isEditarLojaModalOpen, setIsEditarLojaModalOpen] = useState(false);
  const [selectedLojaId, setSelectedLojaId] = useState(null);
  const [selectedLoja, setSelectedLoja] = useState(null);

  // Inicializa a API fora das funções internas
  const { getStores, changeStatus } = LojaApi();

  // Use effect para buscar as lojas
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data.data);
      } catch (error) {
        console.error("Erro ao carregar stores:", error);
      }
    };
    fetchStores();
  }, []);

// Função para alternar o status de uma loja específica
const toggleStoreStatus = async (storeId) => {
  try {
    // Obtenha o status atual da loja
    const storeToUpdate = stores.find((store) => store.id === storeId);
    const newStatus = storeToUpdate.status === "Aberta" ? "Fechada" : "Aberta"; // Define o novo status

    // Atualiza o status da loja localmente
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, status: newStatus } : store
      )
    );

    // Chama a API para alterar o status no backend
    await changeStatus(storeId, newStatus === "Aberta"); // Envia true se "Aberta", false se "Fechada"
  } catch (error) {
    console.error("Error updating store status:", error);
  }
};

const handleEdit = (store) => {
  // Lógica para editar a loja, como abrir um modal ou redirecionar para a página de edição
  console.log("Editando loja:", store);
};

  
const handleEditarLojaModalClose = () => {
  setIsEditarLojaModalOpen(false);
  setSelectedLojaId(null);
};

const handleLojaUpdated = async () => {
  const data = await getStores();
  setStores(data.data);
  handleEditarLojaModalClose();
};

const openEditarLojaModal = (store) => {
  setSelectedLoja(store);
  setIsEditarLojaModalOpen(true);
};

  return (
    <C.Container>
      <Navbar />
      <C.Title>Minha Loja</C.Title>

      {stores.map((store) => (
      <C.Card key={store.id}>
      <C.StatusWrapper>
        <C.StatusIndicator isOpen={store.status === "Aberta"} />
        {store.namestore}
      </C.StatusWrapper>
      <C.ActionsWrapper>
        <C.EditButton onClick={() => openEditarLojaModal(store)}>
          <FaEdit />
        </C.EditButton>
        <C.ToggleSwitch>
          <input
            type="checkbox"
            checked={store.status === "Aberta"}
            onChange={() => toggleStoreStatus(store.id)}
          />
          <C.Slider />
        </C.ToggleSwitch>
      </C.ActionsWrapper>
    </C.Card>
     
      ))}

<EditLojaModal
        isOpen={isEditarLojaModalOpen}
        onClose={handleEditarLojaModalClose}
        loja={selectedLoja}
        onEdit={handleLojaUpdated}
      />
    </C.Container>

  );
};

export default Loja;
