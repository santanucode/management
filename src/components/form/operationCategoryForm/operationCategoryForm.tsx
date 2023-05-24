import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDHEADER, CANCELBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, CATEGORYERROR, CATEGORYLABEL, CATEGORYPLACEHOLDER, SAVEBTN, UPDATEBTN, UPDATEHEADER, DATTUMLABEL, DATTUMPLACEHOLDER, DATTUMERROR } from './categoryString';
import moment from 'moment';

const OperaionCatForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [category, setCategory] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });

    const [dattum, setDattum] = useState<ISubmitResult>({
        value: initialValue.datum
            ? initialValue.datum : null,
        error: false,
        success: false,
    });

    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.effective_from
            ? moment(initialValue.effective_from).format('YYYY-MM-DD') : "",
        error: false,
        success: false,
    });
    let isValueNOTChanged =
        category.value === initialValue.name &&
        dattum.value === initialValue.datum &&
        effectDate.value === initialValue.effective_from;

    let disable =
        category.error ||
        dattum.error ||
        effectDate.error ||
        category.value === "" ||
        dattum.value === "" ||
        effectDate.value === "" ||
        (category.success === false &&
            dattum.success === false &&
            effectDate.success === false) ||
        isValueNOTChanged;

    const handleChangeRoleName = (value: ISubmitResult) => {
        setErrorMessage("")
        setCategory(value);
    };
    const handleChangeDattum = (value: ISubmitResult) => {
        setErrorMessage("")
        setDattum(value);
    };

    const handleChangeDescription = (value: ISubmitResult) => {
        setErrorMessage("")
        setEffectDate(value)
    }

    const handleSubmitForm = () => {
        const data = {
            name: category.value,
            effective_from: moment(effectDate.value).format('YYYY-MM-DD'),
            datum: parseInt(dattum.value)
        }

        console.log("data for checking date",data)
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
                title={clickedBtn === "add" ? ADDHEADER : UPDATEHEADER}
            />
            {errorMessage?<span className='error_msg'>{errorMessage}</span>:null}
            <CardContent>
                <Box
                    component="form"
                    sx={{
                        width: '100%',
                        '& .MuiTextField-root': { mb: 2 },
                    }}
                    noValidate={true}
                >
                    <FormTextField
                        type="textarea"
                        placeholder={CATEGORYPLACEHOLDER}
                        label={CATEGORYLABEL}
                        Value={category.value}
                        onChangeText={handleChangeRoleName}
                        Required={true}
                        CustomErrorLine={CATEGORYERROR}
                    />
                    <FormTextField
                        type="num"
                        placeholder={DATTUMPLACEHOLDER}
                        label={DATTUMLABEL}
                        Value={dattum.value}
                        onChangeText={handleChangeDattum}
                        Required={true}
                        CustomErrorLine={DATTUMERROR}
                    />
                    <FormTextField
                        type="Edate"
                        placeholder={DATEPLACEHOLDER}
                        label={DATELABEL}
                        Value={effectDate.value}
                        onChangeText={handleChangeDescription}
                        Required={true}
                        CustomErrorLine={DATEERROR}
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

export default OperaionCatForm;
