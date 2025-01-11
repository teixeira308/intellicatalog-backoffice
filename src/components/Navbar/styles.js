import styled from "styled-components";

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgb(60, 57, 57);
  color: #fff;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* Garante que a Navbar fique acima do conteúdo */
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Opcional: Adiciona uma sombra para destacar */
`;
export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 0 0;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }

  &.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px; /* Ajuste conforme necessário */
    right: 10px;
    background-color: #333;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const Link = styled.div`
  cursor: pointer;
  font-size: 1rem;
  padding: 10px;
  color: #fff;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #fff;
`;

export const LogoImage = styled.img`
  height: 40px; /* Ajuste a altura conforme necessário */
  width: auto;
`;
