import React from 'react';
import {
    Button,
    DialogActions,
    DialogTitle
} from '@mui/material';
import { InputProps } from './types';


const DeleteModal = (props: InputProps) => {
    const {
        handleModalClose,
        handleSelectClick
    } = props;

    const handleAgree = () => {
        handleSelectClick();
    }

    return (
        <div>
            <DialogTitle id="responsive-dialog-title">
                {'Are you sure you want to delete?'}
            </DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={handleModalClose}>
                    Disagree
                </Button>
                <Button
                    autoFocus
                    onClick={handleAgree}
                >
                    Agree
                </Button>
            </DialogActions>
        </div>
    );
}

export default DeleteModal;
