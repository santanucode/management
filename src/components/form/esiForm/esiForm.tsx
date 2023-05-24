import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, UPDATELABEL, SAVEBTN, UPDATEBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, CANCELBTN, CAPPLACEHOLDER, CAPLABEL, CAPERROR, GROSSPLACEHOLDER, GROSSLABEL, GROSSERROR } from './esiString';
import moment from 'moment';
import "../style.scss"

const EsiForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [grossSalary, setGrossSalary] = useState<ISubmitResult>({
        value: initialValue.esi_percent
            ? initialValue.esi_percent : "",
        error: false,
        success: false,
    });

    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.effective_from
            ? moment(initialValue.effective_from).format('YYYY-MM-DD') : "",
        error: false,
        success: false,
    });
    const [capAt, setCapAt] = useState<ISubmitResult>({
        value: initialValue.cap_at
            ? initialValue.cap_at : "",
        error: false,
        success: false,
    });

    let isValueNOTChanged =
        grossSalary.value === initialValue.esi_percent &&
        effectDate.value === initialValue.effective_from &&
        capAt.value === initialValue.cap_at;
    let disable =
        grossSalary.error ||
        effectDate.error ||
        capAt.error ||
        grossSalary.value === "" ||
        effectDate.value === "" ||
        capAt.value === "" ||
        (grossSalary.success === false &&
            effectDate.success === false &&
            capAt.success === false) ||
        isValueNOTChanged;

    const handleChangeGross = (value: ISubmitResult) => {
        setErrorMessage("");
        setGrossSalary(value);
    };

    const handleChangeDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value);
    };
    const handleChangeCap = (value: ISubmitResult) => {
        setErrorMessage("");
        setCapAt(value);
    };

    const handleSubmitForm = () => {
        const data = {
            esi_percent: parseFloat(grossSalary.value),
            effective_from: moment(effectDate.value).format('YYYY-MM-DD'),
            cap_at: parseFloat(capAt.value),
            is_active: initialValue?.is_active
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
            {errorMessage ?<span className='error_msg'>{errorMessage}</span>:null}
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
                        type="percentage"
                        placeholder={GROSSPLACEHOLDER}
                        label={GROSSLABEL}
                        Value={grossSalary.value}
                        onChangeText={handleChangeGross}
                        Required={true}
                        CustomErrorLine={GROSSERROR}
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

                    <FormTextField
                        type="price"
                        placeholder={CAPPLACEHOLDER}
                        label={CAPLABEL}
                        Value={capAt.value}
                        onChangeText={handleChangeCap}
                        Required={true}
                        CustomErrorLine={CAPERROR}
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

export default EsiForm;
