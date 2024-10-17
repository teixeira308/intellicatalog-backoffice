import React, { useEffect, useState } from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import LojaApi from "../../services/lojaApi";
import EditLojaModal from "../../components/ModalEditarLoja/EditarLojaModal";
import CriarFotosLojaModal from "../../components/ModalCriarFotoLoja/CriarFotosLojaModal";

import { FaEdit ,FaImages} from 'react-icons/fa'; // Importa o ícone de lápis
import LojaImageApi from "../../services/lojaImageApi";


const Loja = () => {
  const [stores, setStores] = useState([]);
  const [storesPhotos, setStoresPhotos] = useState([]);
  const [imageStoreUrls, setImageStoreUrls] = useState([]);
  const [isCriarFotosLojaModalOpen,setIsCriarFotosLojaModalOpen] = useState(false);


  const [isEditarLojaModalOpen, setIsEditarLojaModalOpen] = useState(false);
  const [selectedLojaId, setSelectedLojaId] = useState(null);
  const [selectedLoja, setSelectedLoja] = useState(null);

  // Inicializa a API fora das funções internas
  const { getStores, changeStatus } = LojaApi();
  const { getFotoStoreDownload, getFotoByStoreId, getFotoByUserId } = LojaImageApi();

  // Use effect para buscar as lojas
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStores();
        setStores(data.data);
        console.log("voltou da api lojas:", data.data)
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
        console.log("fotos por usuario: ", fotos)
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
    loadStoreImages();
    handleEditarLojaModalClose();
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

  const openCriarFotoLojaModal = (store) => {
    setSelectedLoja(store);
    setIsCriarFotosLojaModalOpen(true);
  };


  const handleNewFotoLojaCreated = async () => {
    const data = await getStores();
    setStores(data.data);
  };

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
          <C.StatusWrapper>
            <C.StatusIndicator isOpen={store.status === "Aberta"} />
            {store.namestore}
          </C.StatusWrapper>
          <C.ActionsWrapper>
          <C.EditButton onClick={() => openCriarFotoLojaModal(store)}>
                    <FaImages />
                  </C.EditButton>
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

      <CriarFotosLojaModal
        isOpen={isCriarFotosLojaModalOpen}
        onClose={handleCriarFotosLojaModalClose}
        store={selectedLoja}
        onCreate={handleNewFotoLojaCreated}
      />

    </C.Container>

  );
};

export default Loja;
