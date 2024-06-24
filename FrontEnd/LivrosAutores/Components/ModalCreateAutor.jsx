import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ModalCreateAutor = ({ open, onClose, onCreate }) => {
  const [autorInfo, setAutorInfo] = useState({
    id: null,
    nome: '',
    bio: '',
    data_nasc: '',
    nacionalidade: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAutorInfo({ ...autorInfo, [name]: value });
  };

  const handleSubmit = () => {
    onCreate(autorInfo);
    onClose();
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
