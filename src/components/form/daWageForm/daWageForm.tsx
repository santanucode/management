import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, UPDATELABEL, SAVEBTN, UPDATEBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, CANCELBTN, WAGEPLACEHOLDER, WAGELABEL, WAGEERROR } from './daWageString';
import "../style.scss"
const DaWageForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn
    } = props;

    const [basicPercentage, setBasicAmount] = useState<ISubmitResult>({
        value: initialValue.basicPercentage
            ? initialValue.basicPercentage : "",
        error: false,
        success: false,
    });

    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.effectDate
            ? initialValue.effectDate : "",
        error: false,
        success: false,
    });


    let isValueNOTChanged =
        basicPercentage.value === initialValue.basicPercentage &&
        effectDate.value === initialValue.effectDate;
    let disable =
        basicPercentage.error ||
        effectDate.error ||
        basicPercentage.value === "" ||
        effectDate.value === "" ||
        (basicPercentage.success === false &&
            effectDate.success === false) ||
        isValueNOTChanged;



    const handleChangeBasicAmount = (value: ISubmitResult) => {
        setBasicAmount(value);
    };

    const handleChangeDate = (value: ISubmitResult) => {
        setEffectDate(value);
    };

    const handleSubmitForm = () => {
        const data = {
            basicPercentage: basicPercentage.value,
            effectDate: effectDate.value,
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
                        placeholder={WAGEPLACEHOLDER}
                        label={WAGELABEL}
                        Value={basicPercentage.value}
                        onChangeText={handleChangeBasicAmount}
                        Required={true}
                        CustomErrorLine={WAGEERROR}
                    />

                    <FormTextField
                        type="date"
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

export default DaWageForm;
