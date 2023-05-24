import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types';
import FormTextField from 'components/common/textField/textField';
import { ADDHEADER, CANCELBTN, DATEERROR, DATELABEL, DATEPLACEHOLDER, GROUPERROR, GROUPLABEL, GRPPLACEHOLDER, SAVEBTN, UPDATEBTN, UPDATEHEADER } from './groupString';
import moment from 'moment';
import "../style.scss"
const GroupForm = (props: FormProps) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage
    } = props;

    const [groupName, setGroupName] = useState<ISubmitResult>({
        value: initialValue?.name
            ? initialValue.name : "",
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
        groupName.value === initialValue.name &&
        effectDate.value === initialValue.effective_from;

    let disable =
        groupName.error ||
        effectDate.error ||
        groupName.value === "" ||
        effectDate.value === "" ||
        (groupName.success === false &&
            effectDate.success === false) ||
        isValueNOTChanged;

    const handleChangeRoleName = (value: ISubmitResult) => {
        setErrorMessage("");
        setGroupName(value);
    };
    const handleChangeDescription = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value)
    }

    const handleSubmitForm = () => {
        const data = {
            name: groupName.value,
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
                    className={"formResponsiveHeight"}
                    noValidate={true}
                >
                    <FormTextField
                        type="textarea"
                        placeholder={GRPPLACEHOLDER}
                        label={GROUPLABEL}
                        Value={groupName.value}
                        onChangeText={handleChangeRoleName}
                        Required={true}
                        CustomErrorLine={GROUPERROR}
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

export default GroupForm;
