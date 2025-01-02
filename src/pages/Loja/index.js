import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import LojaApi from "../../services/lojaApi";
import EditLojaModal from "../../components/ModalEditarLoja/EditarLojaModal";
import CriarFotosLojaModal from "../../components/ModalCriarFotoLoja/CriarFotosLojaModal";
import EditLojaConfigModal from "../../components/ModalEditarLojaConfig/EditarLojaConfigModal";

import { FaEdit, FaImages, FaCog, FaRegWindowRestore } from 'react-icons/fa'; // Importa o ícone de lápis
import LojaImageApi from "../../services/lojaImageApi";


const Loja = () => {
  const [stores, setStores] = useState([]);
  const [imageStoreUrls, setImageStoreUrls] = useState([]);
  const [isCriarFotosLojaModalOpen, setIsCriarFotosLojaModalOpen] = useState(false);


  const [isEditarLojaModalOpen, setIsEditarLojaModalOpen] = useState(false);

  const [selectedLoja, setSelectedLoja] = useState(null);
  const [isEditarLojaConfigModalOpen, setIsEditarLojaConfigModalOpen] = useState(false);

  // Inicializa a API fora das funções internas
  const { getStores, changeStatus } = LojaApi();
  const { getFotoStoreDownload, getFotoByUserId } = LojaImageApi();

  const store_site = process.env.REACT_APP_STORE_SITE;

  // Use effect para buscar as lojas
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data.data);
        loadStoreImages();
      } catch (error) {
        console.error("Erro ao carregar stores:", error);
      }
    };
    fetchStores();
  }, []);


  // Função para carregar as imagens do stores do usuario
  const loadStoreImages = async () => {
    if (stores) {
      try {
        const fotos = await getFotoByUserId(); // Busca todas as fotos do usuario

        // Gera URLs para cada imagem junto com o ID
        const fotosUrls = await Promise.all(
          fotos.map(async (foto) => {
            const arrayBuffer = await getFotoStoreDownload(foto);
            const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob); // Cria a URL a partir do Blob
            return { id: foto.id, url, store_id: foto.store_id }; // Retorna um objeto com o ID e a URL
          })
        );
        setImageStoreUrls(fotosUrls); // Define todas as URLs das imagens
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
      }
    }
  };


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



  const handleEditarLojaModalClose = () => {
    setIsEditarLojaModalOpen(false);

  };

  const handleEditarLojaConfigModalClose = () => {
    setIsEditarLojaConfigModalOpen(false);

  };

  const handleLojaUpdated = async () => {
    const data = await getStores();
    setStores(data.data);
    loadStoreImages();
    handleEditarLojaModalClose();
  };

  const handleLojaConfigUpdated = async () => {
    const data = await getStores();
    setStores(data.data);
    loadStoreImages();
    handleEditarLojaConfigModalClose();
  };

  const handleCriarFotosLojaModalClose = async () => {
    const data = await getStores();
    setStores(data.data);
    loadStoreImages();
    setIsCriarFotosLojaModalOpen(false)
  };

  const openEditarLojaModal = (store) => {
    setSelectedLoja(store);
    setIsEditarLojaModalOpen(true);
  };

  const openEditarLojaConfigModal = (store) => {
    setSelectedLoja(store);
    setIsEditarLojaConfigModalOpen(true);
  };
  const openCriarFotoLojaModal = (store) => {
    setSelectedLoja(store);
    setIsCriarFotosLojaModalOpen(true);
  };


  const handleNewFotoLojaCreated = async () => {
    const data = await getStores();
    setStores(data.data);
  };


  const openStoreSite = (store) =>{

    window.open(store_site+store.identificadorexterno, '_blank')
  }


  return (
    <C.Container>
      <Navbar />
      <C.Title>Minha Loja</C.Title>

      {stores.map((store) => (
        <C.Card key={store.id}>

          {/* Filtra as imagens que pertencem à loja atual */}
          {imageStoreUrls
            .filter((item) => item.store_id === store.id) // Filtra por storeId
            .map((item, index) => (
              <C.ImagePreview key={index}> {/* Use o id como chave */}
                <img src={item.url} alt={`Foto da store ${store.namestore}`} />
              </C.ImagePreview>
            ))}
          <C.StatusIndicator isOpen={store.status === "Aberta"} />
          {/* Agrupando nome da loja e botões em wrappers */}
          <C.StoreInfoWrapper>
            <C.StatusWrapper>

              {store.namestore}
            </C.StatusWrapper>
            
            <C.ActionsWrapper>
              <C.EditButton onClick={() => openCriarFotoLojaModal(store)}>
                <FaImages /> 
                Foto de perfil
              </C.EditButton>
              <C.EditButton onClick={() => openEditarLojaModal(store)}>
                <FaEdit />
                Informações
              </C.EditButton>
              <C.EditButton onClick={() => openEditarLojaConfigModal(store)}>
                <FaCog />
                Configurações
              </C.EditButton>
              <C.EditButton onClick={() => openStoreSite(store)}>
                <FaRegWindowRestore />
                Ir para loja
              </C.EditButton>
            </C.ActionsWrapper>
  
          </C.StoreInfoWrapper>
          <C.ToggleSwitch>
            <input
              type="checkbox"
              checked={store.status === "Aberta"}
              onChange={() => toggleStoreStatus(store.id)}
            />
            <C.Slider />
          </C.ToggleSwitch>
        </C.Card>
      ))}


      <EditLojaModal
        isOpen={isEditarLojaModalOpen}
        onClose={handleEditarLojaModalClose}
        loja={selectedLoja}
        onEdit={handleLojaUpdated}
      />

      <CriarFotosLojaModal
        isOpen={isCriarFotosLojaModalOpen}
        onClose={handleCriarFotosLojaModalClose}
        store={selectedLoja}
        onCreate={handleNewFotoLojaCreated}
      />

      <EditLojaConfigModal
        isOpen={isEditarLojaConfigModalOpen}
        onClose={handleEditarLojaConfigModalClose}
        loja={selectedLoja}
        onEdit={handleLojaConfigUpdated}
      />
    </C.Container>

  );
};

export default Loja;
