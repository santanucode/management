import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import {  InputAdornment } from '@mui/material';
import { SearchNormal1 } from 'iconsax-react';

export interface ISubmitResult {
    value?: any;
    error?: boolean;
    success?: boolean;
}

const SearchInput = (props: any) => {
    const {
        placeholder,
        Value,
        onChangeText
    } = props;

    const [name, setName] = useState<ISubmitResult>({
        value: Value ? Value : "",
        error: false,
        success: false,
    });
    const handleChangeText = (e: any) => {
        const text = e.target.value;
        const data = text.trimStart();
        const value = {
            value: data,
            success: true,
        };
        onChangeText(value);
        setName(value);

    }

    return (
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            value={Value ? Value : name.value}
            onChange={handleChangeText}
            startAdornment={
                <InputAdornment position="start">
                    <SearchNormal1
                        size="16"
                        color={'rgb(123, 123, 123)'}
                    />
                </InputAdornment>
            }
        />
    );
}

export default SearchInput;
