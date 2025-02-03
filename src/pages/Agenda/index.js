import React from "react";
import React, { useEffect, useState } from "react";
import * as C from "./style";
import Navbar from "../../components/Navbar/Navbar";
import DisponibilidadeApi from "../../services/disponibilidadeApi";
import { FaTrashAlt, FaImages, FaArrowsAlt, FaEdit, FaWhatsapp, FaPlusCircle, FaRandom } from 'react-icons/fa'; // Ícone de lápis

const Agenda = () => {

const [disponibilidades, setDisponibilidades] = useState([]);
const { getAvailability  } = DisponibilidadeApi();

 useEffect(() => {
    const fetchAvaliabilities = async () => {
      try {
        const availabilities = await getAvailability(); // Recebe o objeto completo retornado
        if (availabilities) {
          // console.log("Serviços carregados: ", services);
          setDisponibilidades(availabilities.data); // Define diretamente o retorno, dependendo do formato
        }
      } catch (error) {
        console.error("Erro ao carregar disponibilidades: ", error.message);
      }
    };

    fetchAvaliabilities();
  }, []);

  return (

    <C.Container>
      <Navbar />
      <C.Title>Agenda</C.Title>
      <C.Section>
       {/*} <C.Subtitle></C.Subtitle> {*/} 
        <C.Step>
        <C.GridContainer>
          {disponibilidades.map((availability, index) => (
            <C.Card key={index}>
              <h1>{availability.data}</h1>
            </C.Card>
          ))}
        </C.GridContainer>
        </C.Step>
      </C.Section>
    </C.Container>
  )
};

export default Agenda;