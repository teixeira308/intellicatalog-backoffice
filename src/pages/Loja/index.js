import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Switch,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { FaEdit, FaImages, FaCog, FaRegWindowRestore } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import LojaApi from "../../services/lojaApi";
import LojaImageApi from "../../services/lojaImageApi";
import EditLojaModal from "../../components/ModalEditarLoja/EditarLojaModal";
import CriarFotosLojaModal from "../../components/ModalCriarFotoLoja/CriarFotosLojaModal";
import EditLojaConfigModal from "../../components/ModalEditarLojaConfig/EditarLojaConfigModal";

const Loja = () => {
  const [stores, setStores] = useState([]);
  const [imageStoreUrls, setImageStoreUrls] = useState([]);
  const [isCriarFotosLojaModalOpen, setIsCriarFotosLojaModalOpen] = useState(false);
  const [isEditarLojaModalOpen, setIsEditarLojaModalOpen] = useState(false);
  const [isEditarLojaConfigModalOpen, setIsEditarLojaConfigModalOpen] = useState(false);
  const [selectedLoja, setSelectedLoja] = useState(null);

  const { getStores, changeStatus } = LojaApi();
  const { getFotoStoreDownload, getFotoByUserId } = LojaImageApi();

  const store_site = process.env.REACT_APP_STORE_SITE;

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

  const loadStoreImages = async () => {
    try {
      const fotos = await getFotoByUserId();
      const fotosUrls = await Promise.all(
        fotos.map(async (foto) => {
          const arrayBuffer = await getFotoStoreDownload(foto);
          const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          return { id: foto.id, url, store_id: foto.store_id };
        })
      );
      setImageStoreUrls(fotosUrls);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    }
  };

  const toggleStoreStatus = async (storeId) => {
    try {
      const storeToUpdate = stores.find((store) => store.id === storeId);
      const newStatus = storeToUpdate.status === "Aberta" ? "Fechada" : "Aberta";

      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId ? { ...store, status: newStatus } : store
        )
      );

      await changeStatus(storeId, newStatus === "Aberta");
    } catch (error) {
      console.error("Error updating store status:", error);
    }
  };

  const handleModalClose = () => {
    setIsEditarLojaModalOpen(false);
    setIsEditarLojaConfigModalOpen(false);
    setIsCriarFotosLojaModalOpen(false);
  };

  const refreshData = async () => {
    const data = await getStores();
    setStores(data.data);
    loadStoreImages();
  };

  const openModal = (modalSetter, store) => {
    setSelectedLoja(store);
    modalSetter(true);
  };

  return (
    <Container>
      <Navbar />
      <Typography variant="h4" component="h1" textAlign="center" mt={4} mb={2}>
        Minha Loja
      </Typography>
      <Grid container spacing={3}>
        {stores.map((store) => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {imageStoreUrls
                    .filter((img) => img.store_id === store.id)
                    .map((img, index) => (
                      <Avatar
                        key={index}
                        src={img.url}
                        alt={`Foto da loja ${store.namestore}`}
                        sx={{ width: 64, height: 64, marginRight: 2 }}
                      />
                    ))}
                  <Box>
                    <Typography variant="h6">{store.namestore}</Typography>
                    <Typography
                      variant="body2"
                      color={store.status === "Aberta" ? "success.main" : "error.main"}
                    >
                      {store.status}
                    </Typography>
                  </Box>
                </Box>
                <Switch
                  checked={store.status === "Aberta"}
                  onChange={() => toggleStoreStatus(store.id)}
                />
              </CardContent>
              <CardActions>
                <IconButton onClick={() => openModal(setIsCriarFotosLojaModalOpen, store)}>
                  <FaImages />
                </IconButton>
                <IconButton onClick={() => openModal(setIsEditarLojaModalOpen, store)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => openModal(setIsEditarLojaConfigModalOpen, store)}>
                  <FaCog />
                </IconButton>
                <IconButton onClick={() => window.open(store_site + store.identificadorexterno, "_blank")}>
                  <FaRegWindowRestore />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditLojaModal
        isOpen={isEditarLojaModalOpen}
        onClose={handleModalClose}
        loja={selectedLoja}
        onEdit={refreshData}
      />
      <CriarFotosLojaModal
        isOpen={isCriarFotosLojaModalOpen}
        onClose={handleModalClose}
        store={selectedLoja}
        onCreate={refreshData}
      />
      <EditLojaConfigModal
        isOpen={isEditarLojaConfigModalOpen}
        onClose={handleModalClose}
        loja={selectedLoja}
        onEdit={refreshData}
      />
    </Container>
  );
};

export default Loja;
