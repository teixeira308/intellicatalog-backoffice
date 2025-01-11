import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import logo from "../../assets/logo.png";
import { Drawer, IconButton, List, ListItem, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false); // Fecha o Drawer após a navegação
  };

  return (
    <C.Navbar>
      <C.Logo>
        <C.LogoImage src={logo} alt="Logo" />&nbsp; Vitrine Smart
      </C.Logo>

      {/* Botão para abrir o Drawer */}
      <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* Drawer do Material-UI */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
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
            <LogoutIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>
    </C.Navbar>
  );
};

export default Navbar;
