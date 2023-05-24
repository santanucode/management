import React, { SyntheticEvent, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, UPDATELABEL, SAVEBTN, UPDATEBTN, PRICEERROR, PRICELABEL, PRICEPLACEHOLDER, NAMEPLACEHOLDER, NAMELABEL, NAMEERROR, CANCELBTN, DATEPLACEHOLDER, DATELABEL, DATEERROR } from './shiftFormString';
import "../style.scss"
import moment from 'moment';

const ShiftForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;


    console.log("clickedBtn", clickedBtn)
    
    
    const [shiftName, setShiftName] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });

    const [amount, setAmount] = useState<any>({
        value: initialValue.shiftDetails
            ? initialValue.shiftDetails[0].amount : "",
        error: false,
        success: false,
    });
    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.effective_from
            ? moment(initialValue.effective_from).format('YYYY-MM-DD') : "",
        error: false,
        success: false,
    });
    const [isNight, setisNight] = React.useState<boolean>(
        initialValue ? initialValue.is_night === 1 ? true : false : false
    );

    let initNight = initialValue?.is_night === 0 ? false : true;

    let isValueNOTChanged =
        shiftName.value === initialValue.name 
    
    let disable =
        shiftName.error ||
        amount.error ||
        effectDate.error||
        shiftName.value === "" ||
        amount.value === "" ||
        effectDate.value ==="" ||

        (shiftName.success === false &&
            amount.success === false &&
            effectDate.success === false) ||
        isValueNOTChanged;
    
    let editDiable = shiftName.value === initialValue.name
    
    const handleChangeShiftName = (value: ISubmitResult) => {
        setErrorMessage("");
        setShiftName(value);
    };
    const handleChangeAmount = (value: ISubmitResult) => {
        setErrorMessage("");
        setAmount(value)
    }
    const handleCheckNight = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setErrorMessage("");
        setisNight(checked);
    }
    const handleChangeEffectDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value)
    }


    const handleSubmitForm = () => {
        const data = {
            shift: {
                name: shiftName.value,
                amount: parseFloat(amount.value),
                is_night: isNight,
                effective_from: moment(effectDate.value).format('YYYY-MM-DD')
            }
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
                        placeholder={NAMEPLACEHOLDER}
                        label={NAMELABEL}
                        Value={shiftName.value}
                        onChangeText={handleChangeShiftName}
                        Required={true}
                        CustomErrorLine={NAMEERROR}
                    />
                    {clickedBtn === "edit" ? null :<FormTextField
                        type="price" 
                        placeholder={PRICEPLACEHOLDER}
                        label={PRICELABEL}
                        Value={amount.value}
                        onChangeText={handleChangeAmount}
                        Required={true}
                        CustomErrorLine={PRICEERROR}
                    />}
                    
                    {clickedBtn === "edit" ? null :
                        <FormTextField
                        type="Edate"
                        placeholder={DATEPLACEHOLDER}
                        label={DATELABEL}
                        Value={effectDate.value}
                        onChangeText={handleChangeEffectDate}
                        Required={true}
                        CustomErrorLine={DATEERROR}
                        />}
                    
                    {clickedBtn === "edit" ? null :
                        <FormControlLabel
                            sx={{ mb: 1 }}
                            value={isNight}
                            control={<Checkbox checked={isNight} />}
                            label="Is Night"
                            labelPlacement="end"
                            onChange={handleCheckNight}
                        />}

                    
                   
                </Box>
            </CardContent>
            <CardActions className='d-flex justify-content-end'>
                <Button size="large" variant="outlined" onClick={onHandleClose}>{CANCELBTN}</Button>
                <Button size="large" variant="contained" disabled={clickedBtn === "add" ? disable : editDiable}  onClick={handleSubmitForm}>{clickedBtn === "add" ? SAVEBTN : UPDATEBTN}</Button>
            </CardActions>
        </Card>
    );
}

export default ShiftForm;
