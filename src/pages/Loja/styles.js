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
  flex-direction: column; /* Alinha os elementos verticalmente */
  justify-content: space-evenly; /* Distribui os itens no espaço disponível */
  align-items: center; /* Centraliza horizontalmente */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 97%;
  padding: 20px 20px;
  max-width: 800px;
  font-size: 17px;

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
  color: ${(props) => (props.isOpen ? 'green' : 'red')};
`;


export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px; /* Diminuído */
  height: 20px; /* Diminuído */
  align-items: center;
  justify-content: center;
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
  border-radius: 20px; /* Ajustado proporcionalmente ao novo tamanho */

  &::before {
    position: absolute;
    content: '';
    height: 16px; /* Diminuído proporcionalmente */
    width: 16px; /* Diminuído proporcionalmente */
    left: 2px; /* Ajuste para centralizar corretamente dentro do toggle */
    bottom: 2px; /* Ajuste para centralizar corretamente dentro do toggle */
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + & {
    background-color: #2196f3;
  }

  input:checked + &::before {
    transform: translateX(20px); /* Ajustado para o novo tamanho */
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
  width: 100%;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem linha */
  justify-content: center; /* Centraliza os botões horizontalmente */
  gap: 20px; /* Espaçamento entre os botões */
  margin-top: 20px; /* Espaço entre o nome da loja e os botões */
`;

export const EditButton = styled.button`
  background: none;
  border: 2px solid rgb(63, 65, 66); /* Adiciona uma borda sólida com cor */
  border-radius: 4px; /* Arredonda levemente os cantos */
  cursor: pointer;
  color: rgb(69, 73, 75);
  font-size: 18px; /* Ajusta o tamanho da fonte */
  flex: 1 1 calc(50% - 20px); /* Cada botão ocupa 50% da largura menos o gap */
  max-width: calc(50% - 20px); /* Garante que os botões não ultrapassem 50% */
  text-align: center; /* Centraliza o texto e os ícones */
  padding: 20px;
  &:hover {
    color: rgba(0, 0, 0, 0.61);
    border-color: rgb(63, 65, 66); /* Altera a cor da borda no hover */
  }

  svg {
    margin-right: 8px; /* Adiciona espaço entre o ícone e o texto */
    font-size: 20px; /* Ajusta o tamanho do ícone */
  }
`;



export const ImagePreview = styled.div`
  position: relative; /* Necessário para posicionar o botão */
  width: 200px; /* Largura das imagens */
  height: 200px; /* Altura das imagens */
  overflow: hidden; /* Para esconder partes excedentes da imagem */
  border-radius: 50%; /* Bordas bolinha */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra para a imagem */

  img {
    width: 100%; /* Ajusta a imagem para ocupar o container */
    height: 100%; /* Ajusta a altura para ocupar o container */
    object-fit: cover; /* Garante que a imagem seja recortada proporcionalmente */
  }
`;


export const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Espaçamento entre as imagens */
  margin-top: 20px; /* Espaçamento entre o botão de salvar e as imagens */
 justify-content: center;
`;

export const StoreInfoWrapper = styled.div`
  display: flex;
  flex-direction: line; /* Alinha os elementos em coluna */
  align-items: center; /* Centraliza horizontalmente */
  text-align: center; /* Alinha o texto no centro */
  margin-top: 10px; /* Espaço entre os elementos acima */
  
`;

 
export const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 30px;
  flex-direction: line; /* Alinha os itens em coluna */
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  width: 100%;
  margin-bottom: 20px; /* Espaçamento inferior */
  gap: 40px; /* Espaçamento entre os itens filhos */
`;


export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;
