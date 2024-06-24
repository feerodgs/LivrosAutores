import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const ConfirmDeleteAutor = ({ open, onClose, autorInfo, onDelete }) => {

    const handleDelete = async () => {
        onDelete();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirmar exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem certeza que deseja deletar o autor "{autorInfo.nome}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleDelete} sx={{ color: red[500] }} autoFocus>
                    Deletar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDeleteAutor;
