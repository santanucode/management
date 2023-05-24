import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import moment from 'moment';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, CANCELBTN, CODEERROR, CODELABEL, CODEPLACEHOLDER, DATEERROR, DATELABEL, DATEPLACEHOLDER, NAMEERROR, NAMELABEL, NAMEPLACEHOLDER, RATEERROR, RATELABEL, RATEPLACEHOLDER, SAVEBTN, UPDATEBTN, UPDATELABEL } from './materialFormstring';
import "../style.scss"

const MaterialForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [materialCode, setMaterialCode] = useState<ISubmitResult>({
        value: initialValue.code
            ? initialValue.code : "",
        error: false,
        success: false,
    });

    const [materialName, setMaterialName] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });
    const [materialRate, setMaterialRate] = useState<ISubmitResult>({
        value: initialValue.BCNHL_bonus
            ? initialValue.BCNHL_bonus : "",
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
        materialCode.value === initialValue.code &&
        materialName.value === initialValue.name &&
        materialRate.value === initialValue.BCNHL_bonus &&
        effectDate.value === initialValue.effective_from;

    let disable =
        materialCode.error ||
        materialName.error ||
        materialRate.error ||
        effectDate.error ||
        effectDate.value === "" ||
        materialCode.value === "" ||
        materialName.value === "" ||
        materialRate.value === "" ||
        (materialCode.success === false &&
            materialName.success === false &&
            effectDate.success === false &&
            materialRate.success === false) ||
        isValueNOTChanged;

    const handleChangeCode = (value: ISubmitResult) => {
        setErrorMessage("");
        setMaterialCode(value);
    };
    const handleChangeName = (value: ISubmitResult) => {
        setErrorMessage("");
        setMaterialName(value)
    }
    const handleChangeRate = (value: ISubmitResult) => {
        setErrorMessage("");
        setMaterialRate(value)
    }
    const handleChangeDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value)
    }

    const handleSubmitForm = () => {
        const data = {
            code: materialCode.value,
            name: materialName.value,
            BCNHL_bonus: materialRate.value,
            effective_from: moment(effectDate.value).format('YYYY-MM-DD')
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
                        '& .MuiTextField-root': { mb: 2 },
                    }}

                    className={"formResponsiveHeight"}
                    noValidate={true}
                >
                    <FormTextField
                        type="textarea"
                        placeholder={CODEPLACEHOLDER}
                        label={CODELABEL}
                        Value={materialCode.value}
                        onChangeText={handleChangeCode}
                        Required={true}
                        CustomErrorLine={CODEERROR}
                    />
                    <FormTextField
                        type="textarea"
                        placeholder={NAMEPLACEHOLDER}
                        label={NAMELABEL}
                        Value={materialName.value}
                        onChangeText={handleChangeName}
                        Required={true}
                        CustomErrorLine={NAMEERROR}
                    />
                    <FormTextField
                        type="price"
                        placeholder={RATEPLACEHOLDER}
                        label={RATELABEL}
                        Value={materialRate.value}
                        onChangeText={handleChangeRate}
                        Required={true}
                        CustomErrorLine={RATEERROR}
                    />
                    <FormTextField
                        type="Edate"
                        placeholder={DATEPLACEHOLDER}
                        label={DATELABEL}
                        Value={effectDate.value}
                        onChangeText={handleChangeDate}
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

export default MaterialForm;
