import React, { useState, useEffect } from "react";
import * as C from "./styles";
import lojaApi from "../../services/lojaApi";

const EditarLojaModal = ({ isOpen, onClose, loja, onEdit }) => {
  const { updateLoja, getLojaConfig, updateLojaConfig } = lojaApi();
  const [formData, setFormData] = useState({
    cor_primaria: "",
    cor_secundaria: "",
    taxa_entrega: "",
    numero_whatsapp: "",
    instagram: "",
    facebook: "",
    usa_Status: "",
    chave_pix: "",
    usa_estoque: "",
    cor_botao_primaria: "",
    cor_botao_secundaria: "",
    usa_logo_fundo: ""
  });

  const filterFormData = (data) => {
    // Campos permitidos
    const allowedFields = [
      'cor_primaria',
      'cor_secundaria',
      'cor_botao_primaria',
      'cor_botao_secundaria',
      'taxa_entrega',
      'numero_whatsapp',
      'instagram',
      'facebook',
      'usa_Status',
      'chave_pix',
      'usa_estoque',
      'usa_logo_fundo'
    ];

    // Filtra os dados mantendo apenas os campos permitidos
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );
  };

  const loadStoreConfigs = async (loja) => {
    try {

      const response = await getLojaConfig(loja);

      return response;
    } catch (error) {
      console.error("Erro ao editar loja:", error);
    }
  }

  useEffect(() => {
    const fetchStoreConfigs = async () => {
      if (loja) {
        const storeConfigs = await loadStoreConfigs(loja);
  
        // Converte as strings "true" e "false" em booleanos
        const transformedConfigs = {
          ...storeConfigs,
          usa_logo_fundo: storeConfigs.usa_logo_fundo === "true", // Converte "true" para true e "false" para false
          usa_Status: storeConfigs.usa_Status === "true", // Se você tiver essa propriedade
          usa_estoque: storeConfigs.usa_estoque === "true" // Se você tiver essa propriedade
        };
  
        setFormData((prev) => ({
          ...prev,
          ...transformedConfigs // Atualiza com dados da loja, mantendo os campos existentes
        }));
      }
    };
  
    fetchStoreConfigs();
  }, [loja]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  

  const handleChangeCheckBox = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = {
        ...formData,
        usa_logo_fundo: formData.usa_logo_fundo ? "true" : "false", // Se usa_logo_fundo for true, transforma em "1", caso contrário, "0"
      };
  
      // Filtra os dados que serão enviados
      const filteredData = filterFormData(transformedData);
      await updateLojaConfig(loja.id, filteredData);
      onEdit();
    } catch (error) {
      console.error("Erro ao editar loja:", error);
    }
  };



  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2> Configurações da Minha Loja</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          Cores: <br /><br />
          <C.FormRow>
            <C.FormColumn style={{ flex: 1 }}>
              <C.Label htmlFor="cor_primaria">Tela</C.Label>
              <div style={{ width: '30px', height: '30px', backgroundColor: formData.cor_primaria, border: '1px solid #000', marginTop: '5px' }} />
              <C.Input
                type="color"
                name="cor_primaria"
                id="cor_primaria"
                value={formData.cor_primaria}
                onChange={handleChange}
                required
                style={{ marginRight: '10px' }} // Espaço entre o input e o div
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_secundaria">Fonte</C.Label>
              <div style={{ width: '30px', height: '30px', backgroundColor: formData.cor_secundaria, border: '1px solid #000', marginTop: '5px' }} />
              <C.Input
                type="color"
                name="cor_secundaria"
                id="cor_secundaria"
                value={formData.cor_secundaria}
                onChange={handleChange}
                style={{ marginRight: '10px' }} // Espaço entre o input e o div
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_secundaria">Botão primária</C.Label>
              <div style={{ width: '30px', height: '30px', backgroundColor: formData.cor_botao_primaria, border: '1px solid #000', marginTop: '5px' }} />
              <C.Input
                type="color"
                name="cor_botao_primaria"
                id="cor_botao_primaria"
                value={formData.cor_botao_primaria}
                onChange={handleChange}
                style={{ marginRight: '10px' }} // Espaço entre o input e o div
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_secundaria">Botão secundária</C.Label>
              <div style={{ width: '30px', height: '30px', backgroundColor: formData.cor_botao_secundaria, border: '1px solid #000', marginTop: '5px' }} />
              <C.Input
                type="color"
                name="cor_botao_secundaria"
                id="cor_botao_secundaria"
                value={formData.cor_botao_secundaria}
                onChange={handleChange}
                style={{ marginRight: '10px' }} // Espaço entre o input e o div
              />
            </C.FormColumn>

 
          </C.FormRow>

          <C.FormColumn>
              <C.Label htmlFor="usa_Status">Usa logo como fundo da pagina &nbsp; &nbsp; &nbsp;
              <C.Input
                type="checkbox"
                name="usa_logo_fundo"
                id="usa_logo_fundo"
                checked={formData.usa_logo_fundo}
                onChange={handleChangeCheckBox}
              /></C.Label>
            </C.FormColumn>
            <br/>
          <C.FormRow>
            <div style={{
             height: '30px',
             backgroundColor: formData.cor_primaria, 
             borderColor: formData.cor_botao_primaria, 
             color: formData.cor_secundaria,
             display: 'flex',                // Adiciona o display flex
             justifyContent: 'center',       // Centraliza os botões horizontalmente
             alignItems: 'center'            // Centraliza os botões verticalmente
            }}>
              <button onClick={(e) =>  e.preventDefault()} style={{ backgroundColor: formData.cor_botao_primaria, borderColor: formData.cor_botao_primaria, color: formData.cor_secundaria , marginRight: '10px'  }}>
                Meu carrinho</button>

              <button onClick={(e) =>  e.preventDefault()} style={{ backgroundColor: formData.cor_botao_secundaria, borderColor: formData.cor_botao_secundaria, color: formData.cor_secundaria }}>
                Finalizar Pedido</button>
            </div>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="taxa_entrega">Taxa de entrega</C.Label>
              <C.Input
                type="text"
                name="taxa_entrega"
                id="taxa_entrega"
                value={formData.taxa_entrega}
                onChange={handleChange}
              />
            </C.FormColumn>



            <C.FormColumn>
              <C.Label htmlFor="numero_whatsapp">Whatsapp</C.Label>
              <C.Input
                type="text"
                name="numero_whatsapp"
                id="numero_whatsapp"
                value={formData.numero_whatsapp}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="instagram">
                Instagram
              </C.Label>
              <C.Input
                type="text"
                name="instagram"
                id="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="facebook">Facebook</C.Label>
              <C.Input
                type="text"
                name="facebook"
                id="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </C.FormColumn>
          </C.FormRow>
  {/*

          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="chave_pix">Chave Pix</C.Label>
              <C.Input
                type="text"
                name="chave_pix"
                id="chave_pix"
                value={formData.chave_pix}
                onChange={handleChange}
              />
            </C.FormColumn>

          </C.FormRow>
         
        <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="usa_Status">Usa status da loja</C.Label>
              <C.Input
                type="checkbox"
                name="usa_Status"
                id="usa_Status"
                value={formData.usa_Status}
                onChange={handleChange}
              />
            </C.FormColumn>

          


            <C.FormColumn>
              <C.Label htmlFor="usa_estoque">Usa estoque</C.Label>
              <C.Input
                type="checkbox"
                name="usa_estoque"
                id="usa_estoque"
                value={formData.usa_estoque}
                onChange={handleChange}
              />
            </C.FormColumn>
     
          </C.FormRow> */}


          <C.Button type="submit">Salvar</C.Button>
        </C.ModalForm>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default EditarLojaModal;
