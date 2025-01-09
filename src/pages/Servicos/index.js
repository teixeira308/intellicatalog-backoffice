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
        const data = await getServicesByUser();
        setServicos(data.data);
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
      <C.Step>
        {servicos.length > 0 ? (
          servicos.map((servico) => (
            <C.Card key={servico.id}>
              <p>{servico.name}</p>
              <p>{servico.description}</p>
              <p>{servico.category || "Sem categoria"}</p>
              <p>
                {servico.price ? `R$ ${servico.price.toFixed(2)}` : "Preço não informado"}
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