import { Box, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import ModalCreateLivro from './ModalCreateLivro';
import LivrosActions from './LivrosActions';
import livros from './Livros.json'; // Importando os dados dos livros

const Livros = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'titulo', headerName: 'Título', width: 250, editable: true },
    { field: 'descricao', headerName: 'Descrição', width: 400, editable: true },
    { field: 'nomeAutor', headerName: 'Autor', width: 200, editable: true },
    { field: 'ano_publicacao', headerName: 'Ano de Publicação', width: 150, editable: true },
    { field: 'genero', headerName: 'Gênero', width: 150, editable: true },
    { field: 'quantidade', headerName: 'Quantidade', width: 120, editable: true },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      renderCell: (params) => <LivrosActions {...{ params, rowId, setRowId }} />,
    },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateLivro = (novoLivro) => {
    // Lógica para criar o livro, por exemplo: enviar para o backend, adicionar na lista local, etc.
    console.log('Novo livro criado:', novoLivro);
    // Aqui você pode implementar a lógica para adicionar o novo livro na lista de livros (state ou backend)
    // Exemplo: setState([...livros, novoLivro]);
    // Neste exemplo, apenas fechamos o modal.
    handleCloseModal();
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3, color: 'white' }}>
        Livros
      </Typography>
      
      {/* Botão para abrir o modal */}
      <IconButton color="primary" onClick={handleOpenModal}>
        <AddCircleOutline sx={{ width: 40, height: 40 }} />
      </IconButton>
      
      {/* Modal de criação de livro */}
      <ModalCreateLivro open={openModal} onClose={handleCloseModal} onCreate={handleCreateLivro} />

      {/* DataGrid */}
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
