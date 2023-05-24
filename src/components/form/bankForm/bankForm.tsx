import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, BANKERROR, BANKLABEL, BANKPLACEHOLDER, CANCELBTN, IFSCERROR, IFSCLABEL, IFSCPLACEHOLDER, SAVEBTN, UPDATEBTN, UPDATELABEL } from './bankFormstring';
import "./styles.scss";
import "../style.scss"
const BankForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [name, setName] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });

    const [ifscCode, setIfscCode] = useState<ISubmitResult>({
        value: initialValue.ifsc_code
            ? initialValue.ifsc_code : "",
        error: false,
        success: false,
    });


    let isValueNOTChanged =
        name.value === initialValue.name &&
        ifscCode.value === initialValue.ifsc_code;
    let disable =
        name.error ||
        ifscCode.error ||
        name.value === "" ||
        ifscCode.value === "" ||
        (name.success === false &&
            ifscCode.success === false) ||
        isValueNOTChanged;



    const handleChangeRoleName = (value: ISubmitResult) => {
        setErrorMessage("");
        setName(value);
    };
    const handleChangeDescription = (value: ISubmitResult) => {
        setErrorMessage("");
        setIfscCode(value)
    }

    const handleSubmitForm = () => {
        const data = {
            name: name.value,
            ifsc_code: ifscCode.value
        }
        handleFormData(data)
    }

    return (
        <Card sx={{ boxShadow: "none" }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={onHandleClose}>
                        <MdClose />
                    </IconButton>
                }
                title={clickedBtn === "add" ? ADDNEWLABEL : UPDATELABEL}
            />
            {errorMessage?<span className='error_msg'>{errorMessage}</span>:null}
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        width: '100%',
                        '& .MuiTextField-root': { mb: 2 },
                    }}
                    className={"formResponsiveHeight"}
                    noValidate={true}
                >
                    <FormTextField
                        type="textarea"
                        placeholder={BANKPLACEHOLDER}
                        label={BANKLABEL}
                        Value={name.value}
                        onChangeText={handleChangeRoleName}
                        Required={true}
                        CustomErrorLine={BANKERROR}
                    />
                    <FormTextField
                        type="textarea"
                        placeholder={IFSCPLACEHOLDER}
                        label={IFSCLABEL}
                        Value={ifscCode.value}
                        onChangeText={handleChangeDescription}
                        Required={true}
                        CustomErrorLine={IFSCERROR}
                    />

                </Box>
            </CardContent>
            <CardActions className='d-flex dust justify-content-end'>
                <Button size="large" variant="outlined" onClick={onHandleClose}>{CANCELBTN}</Button>
                <Button size="large" variant="contained" disabled={disable} onClick={handleSubmitForm}>{clickedBtn === "add" ? SAVEBTN : UPDATEBTN}</Button>
            </CardActions>
        </Card>
    );
}

export default BankForm;
