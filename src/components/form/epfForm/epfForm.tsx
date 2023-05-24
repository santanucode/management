import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, UPDATELABEL, SAVEBTN, UPDATEBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, CANCELBTN, EEERROR, EEPLACEHOLDER, EELABEL, EPSERROR, EPSLABEL, EPSPLACEHOLDER, ERERROR, ERLABEL, ERPLACEHOLDER, CAPPLACEHOLDER, CAPLABEL, CAPERROR } from './epfString';
import moment from 'moment';
import "../style.scss"
const EpfForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [percentageEr, setPercentageEr] = useState<ISubmitResult>({
        value: initialValue.er_percent
            ? initialValue.er_percent : "",
        error: false,
        success: false,
    });

    const [percentageEps, setPercentageEps] = useState<ISubmitResult>({
        value: initialValue.eps_percent
            ? initialValue.eps_percent : "",
        error: false,
        success: false,
    });
    const [percentageEE, setPercentageEE] = useState<ISubmitResult>({
        value: initialValue.ee_percent
            ? initialValue.ee_percent : "",
        error: false,
        success: false,
    });
    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.effective_from
            ? moment(initialValue.effective_from).format('YYYY-MM-DD') : "",
        error: false,
        success: false,
    });
    const [capHold, setCapHold] = useState<ISubmitResult>({
        value: initialValue.cap_at
            ? initialValue.cap_at : "",
        error: false,
        success: false,
    });

    let isValueNOTChanged =
        percentageEr.value === initialValue.er_percent &&
        percentageEps.value === initialValue.eps_percent &&
        percentageEE.value === initialValue.ee_percent &&
        effectDate.value === initialValue.effective_from &&
        capHold.value === initialValue.cap_at;
    let disable =
        percentageEr.error ||
        percentageEps.error ||
        percentageEE.error ||
        effectDate.error ||
        capHold.error ||
        percentageEr.value === "" ||
        percentageEps.value === "" ||
        percentageEE.value === "" ||
        effectDate.value === "" ||
        (percentageEr.success === false &&
            percentageEps.success === false &&
            percentageEE.success === false &&
            effectDate.success === false &&
            capHold.success === false) ||
        isValueNOTChanged;

    const handleChangeEr = (value: ISubmitResult) => {
        setErrorMessage("");
        setPercentageEr(value);
    };
    const handleChangeEps = (value: ISubmitResult) => {
        setErrorMessage("");
        setPercentageEps(value);
    };
    const handleChangeEe = (value: ISubmitResult) => {
        setErrorMessage("");
        setPercentageEE(value);
    };
    const handleChangeDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value);
    };
    const handleChangeCap = (value: ISubmitResult) => {
        setErrorMessage("");
        setCapHold(value);
    };

    const handleSubmitForm = () => {
        const data = {
            er_percent: parseFloat(percentageEr.value),
            eps_percent: parseFloat(percentageEps.value),
            ee_percent: parseFloat(percentageEE.value),
            effective_from: moment(effectDate.value).format('YYYY-MM-DD'),
            cap_at: parseFloat(capHold.value),
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
                        '& .MuiTextField-root': { mb: 2 },
                    }}
                    className={"formResponsiveHeight"}
                    noValidate={true}
                >
                    <FormTextField
                        type="percentage"
                        placeholder={ERPLACEHOLDER}
                        label={ERLABEL}
                        Value={percentageEr.value}
                        onChangeText={handleChangeEr}
                        Required={true}
                        CustomErrorLine={ERERROR}
                    />
                    <FormTextField
                        type="percentage"
                        placeholder={EPSPLACEHOLDER}
                        label={EPSLABEL}
                        Value={percentageEps.value}
                        onChangeText={handleChangeEps}
                        Required={true}
                        CustomErrorLine={EPSERROR}
                    />
                    <FormTextField
                        type="percentage"
                        placeholder={EEPLACEHOLDER}
                        label={EELABEL}
                        Value={percentageEE.value}
                        onChangeText={handleChangeEe}
                        Required={true}
                        CustomErrorLine={EEERROR}
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
                        Value={capHold.value}
                        onChangeText={handleChangeCap}
                        Required={false}
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

export default EpfForm;
