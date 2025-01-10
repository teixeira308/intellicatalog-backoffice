import React, { useEffect, useState } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import ServicesApi from "../../services/ServicesApi";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaWhatsapp } from 'react-icons/fa'; // Ícone de lápis
import DeleteServiceModal from "../../components/ModalDeleteServico/DeleteServicoModal";

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const { getServicesByUser, deleteServices, createServices } = ServicesApi();
  const [isDeleteServicoModalOpen, setIsDeleteServicoModalOpen] = useState(false);
    const [selectedServico, setSelectedServico] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await getServicesByUser(); // Recebe o objeto completo retornado
        if (services) {
          console.log("Serviços carregados: ", services);
          setServicos(services); // Define diretamente o retorno, dependendo do formato
        }
      } catch (error) {
        console.error("Erro ao carregar serviços:", error.message);
      }
    };

    fetchServices();
  }, []);

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

  return (
    <>
    <C.PageWrapper>
      <Navbar />
      <C.MainContent>
        <C.Title>Serviços</C.Title>

        
          {servicos.length > 0 ? (
            servicos.map((servico) => (
              <C.Card key={servico.id}>
                <C.CardHeader>
                  <C.CardTitle>{servico.name}</C.CardTitle>
                  <C.CardStatus isActive={servico.is_active}>
                    {servico.is_active ? "Ativo" : "Inativo"}
                  </C.CardStatus>
                </C.CardHeader>
                <C.CardBody>
                  <C.CardDetail>
                    <strong>Descrição:</strong>{" "}
                    {servico.description || "Descrição não informada"}
                  </C.CardDetail>
                  <C.CardDetail>
                    <strong>Categoria:</strong>{" "}
                    {servico.category || "Sem categoria"}
                  </C.CardDetail>
                  <C.CardDetail>
                    <strong>Duração:</strong>{" "}
                    {servico.duration
                      ? `${servico.duration} minutos`
                      : "Duração não especificada"}
                  </C.CardDetail>
                  <C.CardDetail>
                    <strong>Preço:</strong>{" "}
                    {servico.price
                      ? `R$ ${parseFloat(servico.price).toFixed(2)}`
                      : "Preço não informado"}
                  </C.CardDetail>
                  <C.CardDetail>
                    <C.ButtonGroup>
                      <C.EditButton>
                        <FaEdit /> Editar
                      </C.EditButton>
                      <C.TrashButton onClick={() => openDeleteServiceModal(servico)}>
                        <FaTrashAlt /> Excluir
                      </C.TrashButton>
                    </C.ButtonGroup>
                  </C.CardDetail>


                </C.CardBody>
              </C.Card>
            ))
          ) : (
            <p>Nenhum serviço encontrado</p>
          )}
        

      </C.MainContent>
    </C.PageWrapper>

<DeleteServiceModal
        isOpen={isDeleteServicoModalOpen}
        onClose={handleDeleteServicoModalClose}
        onDelete={handleDeleteServico}
        servico={selectedServico}
      />
      </>
  )
};

export default Servicos;