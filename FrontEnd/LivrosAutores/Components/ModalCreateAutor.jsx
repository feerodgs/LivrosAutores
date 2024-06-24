import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from 'axios';

const ModalCreateAutor = ({ open, onClose, onCreate }) => {
  const initialAutorInfo = {
    nome: '',
    bio: '',
    data_nasc: '',
    nacionalidade: '',
  };

  const [autorInfo, setAutorInfo] = useState({ ...initialAutorInfo });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAutorInfo({ ...autorInfo, [name]: value });
  };

  const handleSubmit = async () => {
    const data_nasc = formatDateToAPIFormat(autorInfo.data_nasc);

    const newAutor = {
      ...autorInfo,
      data_nasc: data_nasc,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/autores', autorInfo);
      onCreate(response.data); // Chama a função de criação passando o novo autor retornado pela API
    } catch (error) {
      console.error('Erro ao criar autor:', error);
      // Aqui você pode adicionar tratamento de erro, exibir uma mensagem ao usuário, etc.
    } finally {
      setAutorInfo({ ...initialAutorInfo });
      onClose(); // Fecha o modal independentemente do resultado da requisição
    }
  };

  const formatDateToAPIFormat = (dateString) => {
    if (!dateString) return ''; // Retorna vazio se dateString for falsy

    const parts = dateString.split('/');
    if (parts.length !== 3) return ''; // Retorna vazio se não houver 3 partes

    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Novo Autor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="nome"
          name="nome"
          label="Nome"
          type="text"
          fullWidth
          value={autorInfo.nome}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="bio"
          name="bio"
          label="Biografia"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={autorInfo.bio}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="data_nasc"
          name="data_nasc"
          label="Data de Nascimento"
          type="date"
          fullWidth
          value={autorInfo.data_nasc}
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          id="nacionalidade"
          name="nacionalidade"
          label="Nacionalidade"
          type="text"
          fullWidth
          value={autorInfo.nacionalidade}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCreateAutor;
