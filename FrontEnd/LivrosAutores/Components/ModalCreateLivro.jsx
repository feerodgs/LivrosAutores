import { useState, useEffect } from "react";
import { Box, Button, TextField, Modal, Typography, MenuItem } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalCreateLivro = ({ open, onClose, onCreate }) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [autor, setAutor] = useState("");
  const [ano_publicacao, setAnoPublicacao] = useState("");
  const [genero, setGenero] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/autores");
      setAutores(response.data);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
    }
  };

  const handleCreate = async () => {
    const novoLivro = {
      titulo,
      descricao,
      autor_id: autor, // Certifique-se de que estamos enviando o AutorId
      ano_publicacao,
      genero,
      quantidade,
    };

    try {
      console.log(novoLivro);
      const response = await axios.post("http://localhost:3000/api/livros", novoLivro);
      onCreate(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao criar livro:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Criar Novo Livro
        </Typography>
        <TextField
          label="Título"
          fullWidth
          margin="normal"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <TextField
          label="Descrição"
          fullWidth
          margin="normal"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <TextField
          select
          label="Autor"
          fullWidth
          margin="normal"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        >
          {autores.map((autor) => (
            <MenuItem key={autor.id} value={autor.id}>
              {autor.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Ano de Publicação"
          fullWidth
          margin="normal"
          value={ano_publicacao}
          onChange={(e) => setAnoPublicacao(e.target.value)}
        />
        <TextField
          label="Gênero"
          fullWidth
          margin="normal"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
        <TextField
          label="Quantidade"
          fullWidth
          margin="normal"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <Button onClick={handleCreate} variant="contained" color="primary">
          Criar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCreateLivro;
