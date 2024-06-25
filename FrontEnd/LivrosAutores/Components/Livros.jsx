import { Box, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMemo, useState, useEffect } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import ModalCreateLivro from './ModalCreateLivro';
import LivrosActions from './LivrosActions';
import axios from 'axios';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 60 },
      { field: 'titulo', headerName: 'Título', width: 250, editable: true },
      { field: 'descricao', headerName: 'Descrição', width: 400, editable: true },
      { field: 'nomeAutor', headerName: 'Autor', width: 200 },
      { field: 'ano_publicacao', headerName: 'Ano de Publicação', width: 150, editable: true },
      { field: 'genero', headerName: 'Gênero', width: 150, editable: true },
      { field: 'quantidade', headerName: 'Quantidade', width: 120, editable: true },
      {
        field: 'actions',
        headerName: 'Ações',
        width: 120,
        renderCell: (params) => <LivrosActions 
          {...{ params, rowId, setRowId }}
          onDeleteSuccess={handleDeleteSuccess}
        />,
      },
    ],
    [rowId]
  );

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/livros');
      console.log(response)
      setLivros(response.data.map((livro) => ({ ...livro, nomeAutor: livro.Autor.nome })));
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateLivro = (novoLivro) => {
    setLivros([...livros, novoLivro]);
    fetchLivros();
  };

  const handleDeleteSuccess = () => {
    fetchLivros();
};

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3, color: 'white' }}>
        Livros
      </Typography>
      <IconButton color="primary" onClick={handleOpenModal}>
        <AddCircleOutline sx={{ width: 40, height: 40 }} />
      </IconButton>
      <ModalCreateLivro open={openModal} onClose={handleCloseModal} onCreate={handleCreateLivro} />
      <DataGrid
        columns={columns}
        rows={livros}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onCellEditCommit={(params) => setRowId(params.id)}
        sx={{
          color: 'white',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#414141',
            color: 'white',
          },
          '& .MuiDataGrid-cell': {
            color: 'white',
            borderColor: 'white',
          },
          '& .MuiDataGrid-row': {
            backgroundColor: '#1a1a1a',
            '&:nth-of-type(odd)': {
              backgroundColor: '#2a2a2a',
            },
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#414141',
            color: 'white',
          },
        }}
      />
    </Box>
  );
};

export default Livros;
