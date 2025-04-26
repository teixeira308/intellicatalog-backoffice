import React from "react";
import * as C from "./styles";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const menus = [
    {
      title: "Catálogo",
      description: "Crie e configure seu catálogo definindo categorias e produtos.",
      path: "/catalogo",
    },
    {
      title: "Pedidos",
      description: "Administre os pedidos recebidos via Whatsapp.",
      path: "/pedidos",
    },
    {
      title: "Minha Loja",
      description: "Gerencie e configure sua loja.",
      path: "/minhaloja",
    },
    {
      title: "Suporte",
      description: "Busque ajuda em caso de algum problema ou erro inesperado.",
      path: "/suporte",
    },
  ];


  return (
    <C.Container>
      <Navbar />
      <C.Content>
        <C.Title>Bem-vindo ao Vitrine web</C.Title>
        <C.Description>
          Crie e administre seu catálogo na web. Selecione abaixo o que deseja fazer:
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
