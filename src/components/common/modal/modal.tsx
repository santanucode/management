import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 15,
    p: 1,
    borderRadius: "10px"
};

export const CustomModal = (props: any) => {
    const {
        isOpen,
        handleClose = () => { },
        boxWidth,
    } = props;
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: boxWidth ? boxWidth : 400 }}>
                <div>{props.children}</div>
            </Box>
        </Modal>
    );
}
