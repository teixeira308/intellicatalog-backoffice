import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <C.Navbar>
      <C.Logo>
        <C.LogoImage src={logo} alt="Logo" />&nbsp;
        Vitrinesmart
      </C.Logo>
      <C.NavLinks className={menuOpen ? 'open' : ''}>
        <C.Link onClick={() => { navigate("/home"); setMenuOpen(false); }}>Inicio</C.Link>
        <C.Link onClick={() => { navigate("/catalogo"); setMenuOpen(false); }}>Catalogo</C.Link>
        <C.Link onClick={() => { navigate("/minhaloja"); setMenuOpen(false); }}>Minha Loja</C.Link>
        <C.Link onClick={() => { navigate("/demonstracao"); setMenuOpen(false); }}>Demonstração</C.Link>
        <C.Link onClick={() => { navigate("/inteligencia"); setMenuOpen(false); }}>Venda com IA</C.Link>  
        <C.Link onClick={() => { navigate("/suporte"); setMenuOpen(false); }}>Suporte</C.Link>
        <C.Link onClick={() => { navigate("/tutorial"); setMenuOpen(false); }}>Tutorial</C.Link>    
        <C.Link onClick={() => [signout(), navigate("/")]}>Sair</C.Link>
      </C.NavLinks>
      <C.Hamburger onClick={toggleMenu}>
        <C.Bar />
        <C.Bar />
        <C.Bar />
      </C.Hamburger>
    </C.Navbar>
  );
};

export default Navbar;
