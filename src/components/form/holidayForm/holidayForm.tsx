import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDNEWLABEL, UPDATELABEL, SAVEBTN, UPDATEBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, NAMEPLACEHOLDER, NAMELABEL, NAMEERROR, CANCELBTN } from './holidayString';
import "../style.scss"

const HolidayForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [holidayName, setHolidayName] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });

    const [holidayDate, setholidayDate] = useState<ISubmitResult>({
        value: initialValue.holiday_date
            ? initialValue.holiday_date : "",
        error: false,
        success: false,
    });

    let isValueNOTChanged =
        holidayName.value === initialValue.name &&
        holidayDate.value === initialValue.holiday_date;
    let disable =
        holidayName.error ||
        holidayDate.error ||
        holidayName.value === "" ||
        holidayDate.value === "" ||
        (holidayName.success === false &&
            holidayDate.success === false) ||
        isValueNOTChanged;



    const handleChangeHolidayName = (value: ISubmitResult) => {
        setErrorMessage("");
        setHolidayName(value);
    };
    const handleChangeDescription = (value: ISubmitResult) => {
        setErrorMessage("");
        setholidayDate(value)
    }

    const handleSubmitForm = () => {
        const data = {
            name: holidayName.value,
            holiday_date: holidayDate.value
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
                        Value={holidayName.value}
                        onChangeText={handleChangeHolidayName}
                        Required={true}
                        CustomErrorLine={NAMEERROR}
                    />
                    <FormTextField
                        type="date"
                        placeholder={DATEPLACEHOLDER}
                        label={DATELABEL}
                        Value={holidayDate.value}
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

export default HolidayForm;
