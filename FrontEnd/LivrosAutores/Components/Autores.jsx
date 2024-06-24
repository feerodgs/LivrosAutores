import { Box, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import users from './Users.json';
import { useMemo, useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';

import AutorActions from './AutorActions';
import ModalCreateAutor from './ModalCreateAutor';

const Autores = () => {

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'nome', headerName: 'Nome', width: 250, editable: true },
    { field: 'bio', headerName: 'Biografia', width: 800, editable: true },
    { field: 'data_nasc', headerName: 'Data de Nascimento', width: 150, editable: true },
    { field: 'nacionalidade', headerName: 'Nacionalidade', width: 150, editable: true },
    {
      field: 'actions',
      headerName: 'Ações',
      type: 'actions',
      renderCell: (params) => <AutorActions {...{ params, rowId, setRowId }} />
    }
  ], [rowId]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateAutor = (newAutor) => {
    // Lógica para criar o autor, por exemplo: enviar para o backend, adicionar na lista local, etc.
    console.log('Novo autor criado:', newAutor);
    // Aqui você pode implementar a lógica para adicionar o novo autor na lista de autores (state ou backend)
    // Exemplo: setState([...autores, newAutor]);
    // Neste exemplo, apenas fechamos o modal.
    handleCloseModal();
  };

  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
      }}>
      <Typography
        variant='h3'
        component='h3'
        sx={{ textAlign: 'center', mt: 3, mb: 3, color: 'white' }}
      >
        Autores
      </Typography>
      <IconButton
        color="primary"
        onClick={handleOpenModal}
      >
       <AddCircleOutline
            sx={{
              width: 40,
              height: 40,
            }}
          />
      </IconButton>
      <ModalCreateAutor open={openModal} onClose={handleCloseModal} onCreate={handleCreateAutor} />
      <DataGrid
        columns={columns}
        rows={users}
        getRowId={row => row.id}
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onCellEditCommit={params => setRowId(params.id)}
        sx={{
          color: 'white',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#414141',
            color: 'white'
          },
          '& .MuiDataGrid-cell': {
            color: 'white',
            borderColor: 'white'
          },
          '& .MuiDataGrid-row': {
            backgroundColor: '#1a1a1a',
            '&:nth-of-type(odd)': {
              backgroundColor: '#2a2a2a',
            },
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#414141',
            color: 'white'
          }
        }}
      />
    </Box>
  );
}

export default Autores;
