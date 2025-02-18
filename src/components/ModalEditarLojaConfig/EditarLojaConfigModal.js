import React, { useState, useEffect } from "react";
import * as C from "./styles";
import lojaApi from "../../services/lojaApi";
import { NumericFormat } from 'react-number-format';
import { Modal, Box, Typography, TextField, Button, Checkbox, FormControlLabel, InputAdornment } from "@mui/material";

const EditarLojaConfigModal = ({ isOpen, onClose, loja, onEdit }) => {
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
    usa_estoque: false,  // Definido como booleano
    cor_botao_primaria: "",
    cor_botao_secundaria: "",
    usa_logo_fundo: false,
    calcula_taxa_entrega_posterior: false,
    cor_preco: "",
    cor_preco_promocional: ""
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
      'usa_logo_fundo',
      'calcula_taxa_entrega_posterior',
      'cor_preco',
      'cor_preco_promocional'
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
      console.error("Erro ao carregar configuração da loja:", error);
      window.addToast("Ocorreu um erro ao carregar configuração da loja: " + error, "error");
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
          usa_estoque: storeConfigs.usa_estoque === "true", // Se você tiver essa propriedade
          calcula_taxa_entrega_posterior: storeConfigs.calcula_taxa_entrega_posterior === "true" // Se você tiver essa propriedade
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
      [e.target.name]: e.target.checked,  // Manipula o checkbox como booleano
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = {
        ...formData,
        usa_logo_fundo: formData.usa_logo_fundo ? "true" : "false", // Converte booleano de volta para string
        usa_estoque: formData.usa_estoque ? "true" : "false",  // Converte booleano de volta para string
        calcula_taxa_entrega_posterior: formData.calcula_taxa_entrega_posterior ? "true" : "false"  // Converte booleano de volta para string
      };

      // Filtra os dados que serão enviados
      const filteredData = filterFormData(transformedData);
      await updateLojaConfig(loja.id, filteredData);
      window.addToast("Ação realizada com sucesso!", "success");
      onEdit();
    } catch (error) {
      console.error("Erro ao editar loja:", error);
      window.addToast("Ocorreu um erro ao editar loja: " + error, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{
        width: 400,
        margin: 'auto',
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '90vh', // Garante que o modal não ultrapasse a altura da tela
        overflowY: 'auto', // Adiciona a barra de rolagem vertical quando necessário
      }}>
        <C.ModalHeader>
          <Typography variant="h6" mb={2}>Configurações da Minha Loja</Typography>
        </C.ModalHeader>
        <C.ModalForm onSubmit={handleSubmit}>
          Cores: <br /><br />
          <C.FormRow>
            <C.FormColumn style={{ flex: 1 }}>
              <C.Label htmlFor="cor_primaria">Tela</C.Label>
              <TextField
                type="color"
                name="cor_primaria"
                id="cor_primaria"
                value={formData.cor_primaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_secundaria">Fonte</C.Label>
              <TextField
                type="color"
                name="cor_secundaria"
                id="cor_secundaria"
                value={formData.cor_secundaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_primaria">Botão primária</C.Label>
              <TextField
                type="color"
                name="cor_botao_primaria"
                id="cor_botao_primaria"
                value={formData.cor_botao_primaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_secundaria">Botão secundária</C.Label>
              <TextField
                type="color"
                name="cor_botao_secundaria"
                id="cor_botao_secundaria"
                value={formData.cor_botao_secundaria}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_primaria">Cor do Preço</C.Label>
              <TextField
                type="color"
                name="cor_preco"
                id="cor_preco"
                value={formData.cor_preco}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
            <C.FormColumn>
              <C.Label htmlFor="cor_botao_secundaria">Cor do Preço Promocional</C.Label>
              <TextField
                type="color"
                name="cor_preco_promocional"
                id="cor_preco_promocional"
                value={formData.cor_preco_promocional}
                onChange={handleChange}
                fullWidth
                sx={{ marginRight: '10px' }}
              />
            </C.FormColumn>
          </C.FormRow>
          <C.FormRow>
            <div style={{
              backgroundColor: 'white',
              padding: '5px',
              textAlign: 'center',
              borderBottom: '1px solid #ddd',
              border: '1px'
            }}>
              <span style={{ textDecoration: 'line-through', color: 'red', fontSize: '10px' }}>
                R$20.00
              </span>
              <br />
              Preço promocional <span style={{ color: formData.cor_preco_promocional, fontSize: '15px' }}>
               R$10,00
              </span>
              &nbsp;
              <span style={{ color: 'green', fontSize: '15px' }}>
                50% de desconto
              </span>
              <br/>
              <span style={{  color: formData.cor_preco, fontSize: '15px' }}>
               Preço R$10.00
              </span>
          </div>
          </C.FormRow>
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
            <button onClick={(e) => e.preventDefault()} style={{ backgroundColor: formData.cor_botao_primaria, borderColor: formData.cor_botao_primaria, color: formData.cor_secundaria, marginRight: '10px' }}>
              Meu carrinho</button>

            <button onClick={(e) => e.preventDefault()} style={{ backgroundColor: formData.cor_botao_secundaria, borderColor: formData.cor_botao_secundaria, color: formData.cor_secundaria }}>
              Finalizar Pedido</button>
          </div>
        </C.FormRow>
        <C.FormRow>
          <C.FormColumn>
            <FormControlLabel
              control={
                <Checkbox
                  name="usa_logo_fundo"
                  id="usa_logo_fundo"
                  checked={formData.usa_logo_fundo}
                  onChange={handleChangeCheckBox}
                />
              }
              label="Usar logo de fundo"
            />
          </C.FormColumn>
          <C.FormColumn>
            <FormControlLabel
              control={
                <Checkbox
                  name="usa_estoque"
                  id="usa_estoque"
                  checked={formData.usa_estoque}
                  onChange={handleChangeCheckBox}
                />
              }
              label="Usa estoque"
            />
          </C.FormColumn>

        </C.FormRow>
        <C.FormRow>
          <C.FormColumn>
            <FormControlLabel
              control={
                <Checkbox
                  name="calcula_taxa_entrega_posterior"
                  id="calcula_taxa_entrega_posterior"
                  checked={formData.calcula_taxa_entrega_posterior}
                  onChange={handleChangeCheckBox}
                />
              }
              label="Calcula envio posteriormente"
            />
          </C.FormColumn>
        </C.FormRow>
        <C.FormRow>
          <C.FormColumn>
            <NumericFormat
              customInput={TextField}
              label="Taxa de entrega"
              name="taxa_entrega"
              id="taxa_entrega"
              value={formData.taxa_entrega}
              onValueChange={(values) => {
                const { value } = values; // Obtém o valor numérico
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  taxa_entrega: value, // Atualiza o valor no formData
                }));
              }}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              prefix="R$ "
              placeholder="R$ 0,00"
              fullWidth
              sx={{ mb: 2 }} // Espaçamento inferior
            />
          </C.FormColumn>
          <C.FormColumn>
            <TextField
              label="Whatsapp para receber pedidos"
              name="numero_whatsapp"
              id="numero_whatsapp"
              value={formData.numero_whatsapp}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
          </C.FormColumn>
        </C.FormRow>
        <C.FormRow>
          <C.FormColumn>
            <TextField
              label="Instagram"
              name="instagram"
              id="instagram"
              value={formData.instagram}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </C.FormColumn>
        </C.FormRow>
        <C.FormRow>
          <C.FormColumn>
            <TextField
              label="Facebook"
              name="facebook"
              id="facebook"
              value={formData.facebook}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </C.FormColumn>
        </C.FormRow>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined" color="error" sx={{ mr: 2 }}>Cancelar</Button>
          <Button type="submit" color="success" variant="contained">Salvar</Button>
        </Box>
      </C.ModalForm>
    </Box >
    </Modal >
  );
};

export default EditarLojaConfigModal;
