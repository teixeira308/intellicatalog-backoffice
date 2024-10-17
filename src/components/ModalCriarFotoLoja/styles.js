import styled from "styled-components";

// Estilos para o overlay do modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Estilos para o container do modal
export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// Estilos para o cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Estilos para o botão de fechar
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
`;

// Estilos para o formulário do modal
export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
`;

// Estilos para cada linha do formulário
export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  & > div {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

// Estilos para as colunas do formulário
export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

// Estilos para os rótulos dos inputs
export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

// Estilos para os inputs
export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

// Estilos para o botão de submit
export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;


// Estilo para a imagem
export const Image = styled.img`
  max-width: 100%;  /* A imagem se ajustará à largura do contêiner */
  max-height: 300px;  /* Limita a altura máxima */
  object-fit: contain;  /* Mantém a proporção da imagem */
  border: 1px solid #ccc;  /* Adiciona uma borda leve para destacar */
  border-radius: 8px;  /* Deixa as bordas arredondadas */
  padding: 5px;  /* Espaçamento interno */
  background-color: #f9f9f9;  /* Cor de fundo leve */
`;


export const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Espaçamento entre as imagens */
  margin-top: 20px; /* Espaçamento entre o botão de salvar e as imagens */
 justify-content: center;
`;

 

// Estilos para o botão de deletar
export const DeleteButton = styled.button`
  position: absolute; /* Coloca o botão em cima da imagem */
  top: 5px; /* Distância do topo */
  right: 5px; /* Distância da direita */
  background: none; /* Remove fundo */
  border: none; /* Remove borda */
  color: red; /* Cor do ícone */
  font-size: 1.5rem; /* Tamanho do ícone */
  cursor: pointer; /* Cursor de pointer para indicar que é clicável */

  &:hover {
    color: darkred; /* Muda a cor ao passar o mouse */
  }
`;


// Ajustando o estilo do preview da imagem para incluir o botão
export const ImagePreview = styled.div`
  position: relative; /* Necessário para posicionar o botão */
  width: 100px; /* Largura das imagens */
  height: 100px; /* Altura das imagens */
  overflow: hidden; /* Para esconder partes excedentes da imagem */
  border-radius: 5px; /* Bordas arredondadas */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra para a imagem */

  img {
    width: 100%; /* Ajusta a imagem para ocupar o container */
    height: 100%; /* Ajusta a altura para ocupar o container */
    object-fit: cover; /* Garante que a imagem seja recortada proporcionalmente */
  }
`;

export const Description = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #555;
  text-align: center;
`;
