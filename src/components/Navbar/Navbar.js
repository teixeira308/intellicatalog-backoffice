import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import logo from "../../assets/logo.png";
import { Drawer, IconButton, List, ListItem, ListItemText, Divider, useMediaQuery } from "@mui/material";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detecta telas menores que "md" (960px)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false); // Fecha o Drawer após a navegação
  };

  // Menu de navegação (usado tanto no Drawer quanto no Desktop)
  const renderMenuItems = () => (
    <List>
      <ListItem button onClick={() => handleNavigate("/home")}>
        <ListItemText primary="Início" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/minhaloja")}>
        <ListItemText primary="Minha Loja" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/catalogo")}>
        <ListItemText primary="Catálogo" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/servicos")}>
        <ListItemText primary="Serviços" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/agenda")}>
        <ListItemText primary="Agenda" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/tutorial")}>
        <ListItemText primary="Tutorial" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/demonstracao")}>
        <ListItemText primary="Demonstração" />
      </ListItem>
      <ListItem button onClick={() => handleNavigate("/suporte")}>
        <ListItemText primary="Suporte" />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => [signout(), navigate("/")]}>
        <FaSignOutAlt style={{ marginRight: "10px" }} />
        <ListItemText primary="Sair" />
      </ListItem>
    </List>
  );

  return (
    <C.Navbar>
      {/* Logo */}
      <C.Logo>
        <C.LogoImage src={logo} alt="Logo" />&nbsp; Vitrine Smart
      </C.Logo>

      {isMobile ? (
        // Menu Mobile com Drawer
        <>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <FaBars />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            {renderMenuItems()}
          </Drawer>
        </>
      ) : (
        // Menu Desktop
        <C.NavLinks>
          <C.Link onClick={() => handleNavigate("/home")}>Início</C.Link>
          <C.Link onClick={() => handleNavigate("/minhaloja")}>Minha Loja</C.Link>
          <C.Link onClick={() => handleNavigate("/catalogo")}>Catálogo</C.Link>
          <C.Link onClick={() => handleNavigate("/servicos")}>Serviços</C.Link>
          <C.Link onClick={() => handleNavigate("/agenda")}>Agenda</C.Link>
          <C.Link onClick={() => handleNavigate("/tutorial")}>Tutorial</C.Link>
          <C.Link onClick={() => handleNavigate("/demonstracao")}>Demonstração</C.Link>
          <C.Link onClick={() => handleNavigate("/suporte")}>Suporte</C.Link>
          <C.Link onClick={() => [signout(), navigate("/")]}>Sair</C.Link>
        </C.NavLinks>
      )}
    </C.Navbar>
  );
};

export default Navbar;
