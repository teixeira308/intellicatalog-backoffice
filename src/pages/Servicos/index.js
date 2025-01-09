import React from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import ServicesApi from "../../services/ServicesApi";

const Servicos = () => {
  const [servicos, setServicos] = useState([]);
  const { getServicesByUser, deleteServices, createServices } = ServicesApi();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesByUser();
        setServicos(response.data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
      }
    };
    fetchServices();
  }, []);


  return (


    <C.Container>
    <Navbar />
    <C.Title>Serviços</C.Title>
    <C.Section>
      <C.Subtitle>Veja no vídeo como utilizar o Vitrine Smart para administrar seu catálogo.</C.Subtitle>
      <C.Step>
        {servicos.length > 0 ? (
          servicos.map((servico) => (
            <C.Card key={servico.id}>
              <p>{servico.name}</p>
              <p>{servico.description || "Descrição não informada"}</p>
              <p>{servico.category || "Sem categoria"}</p>
              <p>
                {servico.duration ? `${servico.duration} minutos` : "Duração não especificada"}
              </p>
              <p>
                {servico.price ? `R$ ${parseFloat(servico.price).toFixed(2)}` : "Preço não informado"}
              </p>
              <p>
                {servico.is_active ? "Ativo" : "Inativo"}
              </p>
            </C.Card>
          ))
        ) : (
          <p>Nenhum serviço encontrado</p>
        )}
      </C.Step>
    </C.Section>
  </C.Container>
  )
};

export default Servicos;