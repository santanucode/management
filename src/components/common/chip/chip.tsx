import React from 'react';
import { Chip } from '@mui/material';
import { ACTIVESTATUS, INACTIVESTATUS } from './chipString';

interface InputProps {
    value?: string | number | unknown | undefined,
}

const StatusChip = (props: InputProps) => {
    const {
        value
    } = props;

    return (
        <Chip
            label={value === "ACTIVE" ? ACTIVESTATUS : value === 1 ? ACTIVESTATUS : INACTIVESTATUS}
            sx={{
                backgroundColor: value === "ACTIVE" ? '#61F15557' : value === 1 ? '#61F15557' : '#F1555557',
                color: value === "ACTIVE" ? '#61F155' : value === 1 ? '#61F155' : '#F15555',
            }}
        />
    );
}

export default StatusChip;
