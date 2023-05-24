import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, UPDATELABEL, SAVEBTN, UPDATEBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, CANCELBTN, WAGEPLACEHOLDER, WAGELABEL, WAGEERROR, DALABEL, DAPLACEHOLDER, DAERROR, HRAPLACEHOLDER, HRALABEL, HRAERROR, CANERROR, CANPLACEHOLDER, CANLABEL, DAAMOUNTPLACEHOLDER, DAAMOUNTLABEL, DAAMOUNTERROR, HRAAMOUNTERROR, HRAAMOUNTPLACEHOLDER, HRAAMOUNTLABEL, CANAMOUNTERROR, CANAMOUNTLABEL, CANAMOUNTPLACEHOLDER } from './wageString';
import moment from 'moment';
import "../style.scss"


const WageForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [basicAmount, setBasicAmount] = useState<ISubmitResult>({
        value: initialValue.basic_amount
            ? initialValue.basic_amount : "",
        error: false,
        success: false,
    });

    const [daPercent, setDaPercent] = useState<ISubmitResult>({
        value: initialValue.dearness_allowance_percentage
            ? initialValue.dearness_allowance_percentage : "",
        error: false,
        success: false,
    });
    // const [daAmount, setDaAmount] = useState<ISubmitResult>({
    //     value: initialValue.dearness_allowance_amount
    //         ? initialValue.dearness_allowance_amount : "",
    //     error: false,
    //     success: false,
    // });
    // const [hraAmount, setHraAmount] = useState<ISubmitResult>({
    //     value: initialValue.houserent_allowance_amount
    //         ? initialValue.houserent_allowance_amount : "",
    //     error: false,
    //     success: false,
    // });
    // const [canAmount, setCanAmount] = useState<ISubmitResult>({
    //     value: initialValue.canteen_allowance_amount
    //         ? initialValue.canteen_allowance_amount : "",
    //     error: false,
    //     success: false,
    // });

    const [hraPercent, setHraPercent] = useState<ISubmitResult>({
        value: initialValue.houserent_allowance_percentage
            ? initialValue.houserent_allowance_percentage : "",
        error: false,
        success: false,
    });

    const [canPercent, setCanPercent] = useState<ISubmitResult>({
        value: initialValue.canteen_allowance_percentage
            ? initialValue.canteen_allowance_percentage : "",
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
        basicAmount.value === initialValue.basic_amount &&
        daPercent.value === initialValue.dearness_allowance_percentage &&
        // daAmount.value === initialValue.dearness_allowance_amount &&
        hraPercent.value === initialValue.houserent_allowance_percentage &&
        // hraAmount.value === initialValue.houserent_allowance_amount &&
        canPercent.value === initialValue.canteen_allowance_percentage &&
        // canAmount.value === initialValue.canteen_allowance_amount &&
        effectDate.value === initialValue.effective_from;
    let disable =
        basicAmount.error ||
        effectDate.error ||
        basicAmount.value === "" ||
        effectDate.value === "" ||
        (basicAmount.success === false &&
            daPercent.success === false &&
            hraPercent.success === false &&
            canPercent.success === false &&
            // daAmount.success === false &&
            // hraAmount.success === false &&
            // canAmount.success === false &&
            effectDate.success === false) ||
        isValueNOTChanged;



    const handleChangeBasicAmount = (value: ISubmitResult) => {
        setErrorMessage("");
        setBasicAmount(value);
    };
    const handleChangeDA = (value: ISubmitResult) => {
        setErrorMessage("");
        setDaPercent(value);
    };
    // const handleChangeDAAmount = (value: ISubmitResult) => {
    //     setErrorMessage("");
    //     setDaAmount(value);
    // };
    // const handleChangeHraAmount = (value: ISubmitResult) => {
    //     setErrorMessage("");
    //     setHraAmount(value);
    // };
    // const handleChangeCanAmount = (value: ISubmitResult) => {
    //     setErrorMessage("");
    //     setCanAmount(value);
    // };



    const handleChangeHra = (value: ISubmitResult) => {
        setErrorMessage("");
        setHraPercent(value);
    };
    const handleChangeCan = (value: ISubmitResult) => {
        setErrorMessage("");
        setCanPercent(value);
    };

    const handleChangeDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value);
    };

    const handleSubmitForm = () => {
        const data = {
            basic_amount: parseFloat(basicAmount.value),
            dearness_allowance_percentage: parseFloat(daPercent.value),
            // dearness_allowance_amount: parseFloat(daAmount.value),
            houserent_allowance_percentage: parseFloat(hraPercent.value),
            // houserent_allowance_amount: parseFloat(hraAmount.value),
            canteen_allowance_percentage: parseFloat(canPercent.value),
            // canteen_allowance_amount: parseFloat(canAmount.value),
            effective_from: moment(effectDate.value).format('YYYY-MM-DD'),
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
           {errorMessage ? <span className='error_msg'>{errorMessage}</span>:null}
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
                        type="price"
                        placeholder={WAGEPLACEHOLDER}
                        label={WAGELABEL}
                        Value={basicAmount.value}
                        onChangeText={handleChangeBasicAmount}
                        Required={true}
                        CustomErrorLine={WAGEERROR}
                    />
                    <FormTextField
                        type="percentage"
                        placeholder={DAPLACEHOLDER}
                        label={DALABEL}
                        Value={daPercent.value}
                        onChangeText={handleChangeDA}
                        Required={false}
                        CustomErrorLine={DAERROR}
                    />
                    {/* <FormTextField
                        type="price"
                        placeholder={DAAMOUNTPLACEHOLDER}
                        label={DAAMOUNTLABEL}
                        Value={daAmount.value}
                        onChangeText={handleChangeDAAmount}
                        Required={false}
                        CustomErrorLine={DAAMOUNTERROR}
                    /> */}
                    <FormTextField
                        type="percentage"
                        placeholder={HRAPLACEHOLDER}
                        label={HRALABEL}
                        Value={hraPercent.value}
                        onChangeText={handleChangeHra}
                        Required={false}
                        CustomErrorLine={HRAERROR}
                    />
                    {/* <FormTextField
                        type="price"
                        placeholder={HRAAMOUNTPLACEHOLDER}
                        label={HRAAMOUNTLABEL}
                        Value={hraAmount.value}
                        onChangeText={handleChangeHraAmount}
                        Required={false}
                        CustomErrorLine={HRAAMOUNTERROR}
                    /> */}
                    <FormTextField
                        type="percentage"
                        placeholder={CANPLACEHOLDER}
                        label={CANLABEL}
                        Value={canPercent.value}
                        onChangeText={handleChangeCan}
                        Required={false}
                        CustomErrorLine={CANERROR}
                    />
                    {/* <FormTextField
                        type="price"
                        placeholder={CANAMOUNTPLACEHOLDER}
                        label={CANAMOUNTLABEL}
                        Value={canAmount.value}
                        onChangeText={handleChangeCanAmount}
                        Required={false}
                        CustomErrorLine={CANAMOUNTERROR}
                    /> */}
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

export default WageForm;
