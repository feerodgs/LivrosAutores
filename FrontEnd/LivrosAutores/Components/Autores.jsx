import { Box, Typography, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMemo, useState, useEffect } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import ModalCreateAutor from './ModalCreateAutor';
import AutorActions from './AutorActions';
import axios from 'axios';
import moment from 'moment';

const Autores = () => {
    const [autores, setAutores] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const columns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 60 },
            { field: 'nome', headerName: 'Nome', width: 250, editable: true },
            { field: 'bio', headerName: 'Biografia', width: 800, editable: true },
            { field: 'data_nasc', headerName: 'Data de Nascimento', width: 150, editable: false, renderCell: params=>moment(params.row.data_nasc).format('DD/MM/YYYY') },
            { field: 'nacionalidade', headerName: 'Nacionalidade', width: 150, editable: true },
            {
                field: 'actions',
                headerName: 'Ações',
                type: 'actions',
                renderCell: (params) => (
                    <AutorActions
                        {...{ params, rowId, setRowId }}
                        onDeleteSuccess={handleDeleteSuccess}
                        onUpdateSuccess={fetchAutores}
                    />
                ),
            },
        ],
        [rowId]
    );

    useEffect(() => {
        fetchAutores();
    }, []);

    const fetchAutores = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/autores');
            setAutores(response.data);
        } catch (error) {
            console.error('Erro ao buscar autores:', error);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleCreateAutor = (newAutor) => {
        setAutores([...autores, newAutor]);
    };

    const handleDeleteSuccess = () => {
        fetchAutores();
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h3" component="h3" sx={{ textAlign: 'center', mt: 3, mb: 3, color: 'white' }}>
                Autores
            </Typography>
            <IconButton color="primary" onClick={handleOpenModal}>
                <AddCircleOutline sx={{ width: 40, height: 40 }} />
            </IconButton>
            <ModalCreateAutor open={openModal} onClose={handleCloseModal} onCreate={handleCreateAutor} />
            <DataGrid
                columns={columns}
                rows={autores}
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

export default Autores;
