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
        Intellicatalog
      </C.Logo>
      <C.NavLinks className={menuOpen ? 'open' : ''}>
        <C.Link onClick={() => { navigate("/b/home"); setMenuOpen(false); }}>Inicio</C.Link>
        <C.Link onClick={() => { navigate("/b/catalogo"); setMenuOpen(false); }}>Catalogo</C.Link>
        <C.Link onClick={() => { navigate("/b/minhaloja"); setMenuOpen(false); }}>Minha Loja</C.Link>
        <C.Link onClick={() => { navigate("/b/demonstracao"); setMenuOpen(false); }}>Demonstração</C.Link>
        <C.Link onClick={() => { navigate("/b/inteligencia"); setMenuOpen(false); }}>Venda com IA</C.Link>  
        <C.Link onClick={() => { navigate("/b/suporte"); setMenuOpen(false); }}>Suporte</C.Link>
        <C.Link onClick={() => { navigate("/b/tutorial"); setMenuOpen(false); }}>Tutorial</C.Link>    
        <C.Link onClick={() => [signout(), navigate("/b")]}>Sair</C.Link>
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
