import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const menus = [
    {
      title: "Templates",
      description: "Crie e configure modelos de documentos personalizados.",
      path: "/templates",
    },
    {
      title: "Pessoas",
      description: "Cadastre pessoas e armazene seus dados.",
      path: "/pessoas",
    },
    {
      title: "Grupos",
      description: "Organize pessoas em grupos para facilitar a geração de documentos.",
      path: "/grupo",
    },
    {
      title: "EPI",
      description: "Gerencie Equipamentos de Proteção Individual de cada pessoa.",
      path: "/epi",
    },
    {
      title: "Geração",
      description: "Gere documentos automaticamente a partir de templates.",
      path: "/demonstracao",
    },
  ];


  return (
    <C.Container>
      <Navbar />
      <C.Content>
        <C.Title>Bem-vindo ao Doc Filler</C.Title>
        <C.Description>
          Automatize a criação de documentos com dados personalizados. Selecione abaixo o que deseja fazer:
        </C.Description>
        <C.Grid>
          {menus.map((menu) => (
            <C.Card key={menu.title} onClick={() => navigate(menu.path)}>
              <C.CardTitle>{menu.title}</C.CardTitle>
              <C.CardDescription>{menu.description}</C.CardDescription>
            </C.Card>
          ))}
        </C.Grid>
      </C.Content>
    </C.Container>
  );
};

export default Home;
