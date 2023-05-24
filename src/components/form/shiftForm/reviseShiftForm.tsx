import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, FormReviseProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { SAVEBTN, UPDATEBTN, PRICEERROR, PRICELABEL, PRICEPLACEHOLDER, NAMEPLACEHOLDER, NAMELABEL, NAMEERROR, CANCELBTN, DATEPLACEHOLDER, DATELABEL, DATEERROR, REVISELABEL } from './shiftFormString';
import "../style.scss"
import moment from 'moment';

const ReviseShiftForm = (props: FormReviseProps) => {
    const {
        initialValue = {},
        // initValAdd,
        handleFormData,
        onHandleClose,
        errorMessage,
        clickedBtn,
        setErrorMessage
    } = props; 



    console.log("initialValue coming add",initialValue)

    const [amount, setAmount] = useState<any>({
        value: initialValue.subRows ? initialValue.subRows.upcoming_date[0].amount :0,
        // value: 0,
        error: false,
        success: false,
    });
    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.subRows ? initialValue.subRows.upcoming_date[0].effective_from :"",
        // value: "",
        error: false,
        success: false,
    });

    const handleChangeAmount = (value: ISubmitResult) => {
        setErrorMessage("");
        setAmount(value)
    }

    const handleChangeEffectDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value)
    }

    // let isValueNOTChanged =
    // amount.value === initialValue.subRows.upcoming_date[0].amount ? initialValue?.subRows.upcoming_date[0].amount :null &&
    // effectDate.value === initialValue?.subRows.upcoming_date[0].effective_frominitialValue?.subRows.upcoming_date[0].effective_from;
    let disable =
        amount.error ||
        effectDate.error ||
        amount.value === "" ||
        effectDate.value === "" ||
        (amount.success === false &&
            effectDate.success === false) 

    const handleSubmitForm = () => { 
        const data = {
            id: initialValue.subRows ? initialValue.subRows.upcoming_date[0].id:null,
            amount: parseFloat(amount.value),
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
                title={REVISELABEL}
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
                    {errorMessage?<span className='error_msg'>{errorMessage}</span>:null}
                    <FormTextField
                        type="price"
                        placeholder={PRICEPLACEHOLDER}
                        label={PRICELABEL}
                        Value={amount.value}
                        onChangeText={handleChangeAmount}
                        Required={true}
                        CustomErrorLine={PRICEERROR}
                    />
                    <FormTextField
                        type="Edate"
                        isEffective={true}
                        placeholder={DATEPLACEHOLDER}
                        label={DATELABEL}
                        Value={effectDate.value}
                        onChangeText={handleChangeEffectDate}
                        Required={true}
                        CustomErrorLine={DATEERROR}
                    />
                </Box>
            </CardContent>
            <CardActions className='d-flex justify-content-end'>
                <Button size="large" variant="outlined" onClick={onHandleClose}>{CANCELBTN}</Button>
                <Button size="large" variant="contained" disabled={disable}  onClick={handleSubmitForm}>{SAVEBTN}</Button>
            </CardActions>
            
        </Card>
    );
}

export default ReviseShiftForm;
