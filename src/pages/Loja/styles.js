import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
`;



export const Title = styled.h2``;



export const Card = styled.div`
  display: flex;
  justify-content: space-between; /* Distribui os itens nos extremos */
  align-items: center; /* Centraliza verticalmente */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 97%;
  font-size: 20px;
  padding: 20px 20px;

  font-size:17px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const StatusIndicator = styled.span`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  background-color: ${(props) => (props.isOpen ? 'green' : 'red')};
`;


export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:checked + &::before {
    transform: translateX(26px);
  }
`;

export const StatusText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: ${(props) => (props.isOpen ? 'green' : 'red')};
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Espaçamento entre o botão de edição e o toggle */
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #2196f3;
  font-size: 20px;

  &:hover {
    color: #1769aa;
  }
`;
