import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ModalCreateLivro = ({ open, onClose, onCreate }) => {
  const [livroInfo, setLivroInfo] = useState({
    id: null,
    titulo: '',
    descricao: '',
    nomeAutor: '',
    ano_publicacao: '',
    genero: '',
    quantidade: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLivroInfo({ ...livroInfo, [name]: value });
  };

  const handleSubmit = () => {
    onCreate(livroInfo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Criar Novo Livro</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="titulo"
          name="titulo"
          label="Título"
          type="text"
          fullWidth
          value={livroInfo.titulo}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="descricao"
          name="descricao"
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={livroInfo.descricao}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="nomeAutor"
          name="nomeAutor"
          label="Nome do Autor"
          type="text"
          fullWidth
          value={livroInfo.nomeAutor}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="ano_publicacao"
          name="ano_publicacao"
          label="Ano de Publicação"
          type="number"
          fullWidth
          value={livroInfo.ano_publicacao}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="genero"
          name="genero"
          label="Gênero"
          type="text"
          fullWidth
          value={livroInfo.genero}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="quantidade"
          name="quantidade"
          label="Quantidade"
          type="number"
          fullWidth
          value={livroInfo.quantidade}
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

export default ModalCreateLivro;
