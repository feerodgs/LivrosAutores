import { Box, CircularProgress, Fab } from "@mui/material";
import { useState, useEffect } from "react";
import { Check, Save, Delete } from '@mui/icons-material';
import { green, red } from "@mui/material/colors";
import ConfirmDeleteLivro from "./ConfirmDeleteLivro";
import axios from 'axios';

const LivrosActions = ({ params, rowId, setRowId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:3000/api/livros/${params.id}`, params.row);
            setSuccess(true);
            setRowId(null);
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setOpenDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        setLoadingDelete(true);
        try {
            await axios.delete(`http://localhost:3000/api/livros/${params.id}`);
            onDeleteSuccess(params.id)
            setSuccess(true);
            setRowId(null);
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
        } finally {
            setLoadingDelete(false);
            setOpenDeleteModal(false);
        }
    };

    useEffect(() => {
        if (rowId === params.id && success) setSuccess(false);
    }, [rowId, success, params.id]);

    return (
        <Box sx={{ m: 1, position: 'relative' }}>
            {success ? (
                <Fab
                    color='primary'
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: green[500],
                        '&:hover': { bgcolor: green[700] }
                    }}
                >
                    <Check />
                </Fab>
            ) : (
                <>
                    <Fab
                        color='primary'
                        sx={{
                            width: 40,
                            height: 40,
                            mr: 1,
                        }}
                        disabled={params.id !== rowId || loading}
                        onClick={handleSubmit}
                    >
                        <Save />
                    </Fab>
                    <Fab
                        color='secondary'
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: red[500],
                            '&:hover': { bgcolor: red[700] }
                        }}
                        onClick={handleDelete}
                    >
                        <Delete />
                    </Fab>
                </>
            )}
            {loading && (
                <CircularProgress
                    size={52}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                />
            )}

            <ConfirmDeleteLivro
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                livroInfo={params.row}
                onDelete={handleDeleteConfirm}
            />

            {loadingDelete && (
                <CircularProgress
                    size={48}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -5,
                        left: 44,
                        zIndex: 1,
                    }}
                />
            )}
        </Box>
    );
}

export default LivrosActions;
