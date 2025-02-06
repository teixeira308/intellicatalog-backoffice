import React, { useEffect, useState } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import ServicesApi from "../../services/ServicesApi";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaWhatsapp, FaPlusCircle, FaRandom } from 'react-icons/fa'; // Ícone de lápis
import DeleteServiceModal from "../../components/ModalDeleteServico/DeleteServicoModal";
import CriarServicoModal from "../../components/ModalCriarServico/CriarServicoModal";
import EditarServicoModal from "../../components/ModalEditarServico/EditarServicoModal";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Container, Button, Card, CardContent, Typography, IconButton, Switch, Menu, MenuItem, Box } from "@mui/material";
import { AddCircle, MoreVert, Edit, Delete, Image, Inventory, Shuffle } from "@mui/icons-material";


const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const { getServicesByUser, deleteServices, updateServiceOrder, updateServiceStatus } = ServicesApi();
  const [isDeleteServicoModalOpen, setIsDeleteServicoModalOpen] = useState(false);
  const [isCriarServicoModalOpen, setIsCriarServicoModalOpen] = useState(false);
  const [selectedServico, setSelectedServico] = useState(null);
  const [isEditarServicoModalOpen, setIsEditarServicoModalOpen] = useState(null);

  const [isReorderMode, setIsReorderMode] = useState(false); // Estado para o modo de reordenação
  const [isReorderProductMode, setIsReorderProductMode] = useState(false); // Estado para o modo de reordenação

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServicesByUser(); // Recebe o objeto completo retornado
        if (services) {
          // console.log("Serviços carregados: ", services);
          setServicos(services); // Define diretamente o retorno, dependendo do formato
        }
      } catch (error) {
        console.error("Erro ao carregar serviços:", error.message);
      }
    };

    fetchServices();
  }, []);

  //DELETE SERVICE
  const handleDeleteServicoModalClose = () => {
    setIsDeleteServicoModalOpen(false);
    setSelectedServico(null);
  };

  const handleDeleteServico = async () => {
    try {
      if (selectedServico) {
        await deleteServices(selectedServico);
        setServicos(servicos.filter((servico) => servico.id !== selectedServico.id));
      }
      handleDeleteServicoModalClose();
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
    }
  };

  const openDeleteServiceModal = (servico) => {
    setSelectedServico(servico);
    setIsDeleteServicoModalOpen(true);
  };

  //CRIAR SERVIÇO

  const handleCriarServicoModalClose = () => {
    setIsCriarServicoModalOpen(false);
  };

  const handleNewServicoCreated = async () => {
    const data = await getServicesByUser();
    setServicos(data);
  };

  const openCriarProdutoModal = () => {
    setIsCriarServicoModalOpen(true);
  };

  //EDITAR SERVIÇO

  const openEditarServicoModal = (servico) => {
    setSelectedServico(servico);
    setIsEditarServicoModalOpen(true);
  };

  const handleServicoEdited = async () => {
    const data = await getServicesByUser();
    setServicos(data);
    setIsEditarServicoModalOpen(false)
  };

  //REORDENAR

  const handleChangeStatusServico = async (servico) => {
    try {
      if (servico) {
        // Altera o status localmente e envia ao backend
        const updatedServico = {
          ...servico,
          is_active: servico.is_active === 1 ? 0 : 1, // Alterna o status
        };
        console.log('servico id:', servico.id)
        // Chamada à API para atualizar o status
        await updateServiceStatus(servico.id, updatedServico);

        // Atualiza a lista de serviços no estado
        setServicos((prevServicos) =>
          prevServicos.map((s) =>
            s.id === servico.id ? { ...s, is_active: updatedServico.is_active } : s
          )
        );
      }
    } catch (error) {
      console.error("Erro ao mudar o status do serviço:", error);
    }
  };


  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    // Índices de origem e destino vindos do drag-and-drop (começam de 0)
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // console.log('Índice de origem:', sourceIndex);
    //console.log('Índice de destino:', destinationIndex);

    // Cria uma cópia do array de categorias
    const reorderedServices = [...servicos];

    // Remove o item da posição inicial
    const [reorderedItem] = reorderedServices.splice(sourceIndex, 1);

    // Insere o item na nova posição
    reorderedServices.splice(destinationIndex, 0, reorderedItem);

    // console.log("Categorias reorganizadas:", reorderedCategorias);

    try {
      // Enviar nova ordem para o backend
      console.log(reorderedServices);

      const response = await updateServiceOrder(reorderedServices);
      console.log(response.status);
      if (response.status === 200) {
        const data = await getServicesByUser();
        setServicos(data);
        //console.log("Categorias reatualizadas do backend:", data.data);
        setIsReorderMode(false)
      } else {
        console.error("Erro inesperado ao atualizar a ordem dos serviços:", response);
      }
    } catch (error) {
      console.error("Erro ao atualizar a ordem dos serviços:", error);
    }
  };

  //UPDATE STATUS



  return (
    <>
      <C.Container>
        <Container maxWidth="md">
          <Navbar />
          <Typography variant="h6" sx={{ textAlign: "center", my: 3 }}>Serviços</Typography>



          {/*}<C.ButtonGroup>
            <C.CreateButton onClick={() => openCriarProdutoModal()}>
              <FaPlusCircle /> Novo Serviço
            </C.CreateButton>
            <C.ReordButton onClick={() => setIsReorderMode(!isReorderMode)}>
              <FaRandom /> Reordenar
            </C.ReordButton>
          </C.ButtonGroup>
           {*/}

          <Box display="flex" justifyContent="center" gap={2} my={2}>
            {!isReorderMode && (
              <Button size="medium" color="success" variant="contained" startIcon={<AddCircle />} onClick={() => openCriarProdutoModal()}>
                Serviço
              </Button>
            )}
            <Button size="medium" variant="outlined" endIcon={<Shuffle />} onClick={() => setIsReorderMode(!isReorderMode)}>
              {isReorderMode ? "Salvar Ordem" : "Reordenar"}
            </Button>
          </Box> 
          {
            isReorderMode ? (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="servicos">
                  {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                      {servicos
                        .sort((a, b) => (a.servico_order || 0) - (b.servico_order || 0))
                        .map((servico, index) => (
                          <Draggable key={servico.id} draggableId={String(servico.servico_order || index)} index={index}>
                            {(provided) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <C.StatusWrapper>
                                  <Typography variant="h6">{servico.name}</Typography>
                                  <C.ActionsWrapper>
                                    <FaArrowsAlt style={{ color: "blue" }} />
                                  </C.ActionsWrapper>
                                </C.StatusWrapper>
                              </Card>
                            )}
                          </Draggable>
                        ))}

                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              servicos
                .sort((a, b) => a.servico_order - b.servico_order)
                .map((servico) => (
                  <C.Card key={servico.servico_order}>
                    <C.CardHeader>
                       
                      <Typography variant="h6" sx={{ textAlign: "center", my: 3 }}>{servico.name}</Typography>
                     
                      <C.CardStatus onClick={() => { handleChangeStatusServico(servico); }}>
                        {servico.is_active ? "Ativo" : "Inativo"}
                      </C.CardStatus>
                    </C.CardHeader>
                    <C.CardBody>
                      <C.CardDetail>
                        <strong>Descrição:</strong>{" "}
                        {servico.description || "Descrição não informada"}
                      </C.CardDetail>
                      <C.CardDetail>
                        <strong>Preço:</strong>{" "}
                        {servico.price
                          ? `R$ ${parseFloat(servico.price).toFixed(2)}`
                          : "Preço não informado"}
                      </C.CardDetail>
                      <C.CardDetail>
                        <C.ButtonGroup>
                          <Button size="small" color="success" variant="contained" onClick={() => openEditarServicoModal(servico)}>
                            <Edit   /> Editar
                          </Button>
                          <Button size="small" variant="outlined" color="error" onClick={() => openDeleteServiceModal(servico)}>
                            <Delete   /> Excluir
                          </Button>
                        </C.ButtonGroup>
                      </C.CardDetail>
                    </C.CardBody>
                  </C.Card>
                )
                )
            )
          }
        </Container>
      </C.Container>

      <CriarServicoModal
        isOpen={isCriarServicoModalOpen}
        onClose={handleCriarServicoModalClose}
        onCreate={handleNewServicoCreated}
      />

      <DeleteServiceModal
        isOpen={isDeleteServicoModalOpen}
        onClose={handleDeleteServicoModalClose}
        onDelete={handleDeleteServico}
        servico={selectedServico}
      />

      <EditarServicoModal
        isOpen={isEditarServicoModalOpen}
        onClose={() => setIsEditarServicoModalOpen(false)}
        servico={selectedServico}
        onEdit={handleServicoEdited}
      />
    </>
  )
};

export default Servicos;