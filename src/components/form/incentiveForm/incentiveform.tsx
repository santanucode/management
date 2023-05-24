import React, { SyntheticEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { MdClose } from "react-icons/md";
import "./Style.scss"
import FormTextDropdown from 'components/common/textDropdown/textDropdown';
import { ADDBTNLABEL, CANCELBTN, DATECUSTOMERR, DATELABEL, DATEPLACEHOLDER, HIKECUSTOMERR, HIKELABEL, HIKEPLACEHOLDER, OPERATIONCUSTOMERR, OPERATIONLABEL, OPERATIONPLACEHOLDER, RANGECUSTOMERR, RANGELABEL, RANGEPLACEHOLDER, SAVEBTN, SLABCUSTOMERR, SLABLABEL, SLABPLACEHOLDER, UPDATEBTN, UPDATEBTNLABEL } from './incentiveString';
import { FORMPROPS } from './types';
import moment from 'moment';
import FormTextField from 'components/common/textField/textField';
import "../style.scss"

interface ISubmitResult {
    value?: any;
    error?: boolean;
    success?: boolean;
}

const IncentiveSlab = (props: FORMPROPS) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        errorMessage,
        setErrorMessage,
        operationList
    } = props


    const [slabName, setSlabName] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });
    const [operationName, setOperationName] = useState<ISubmitResult>({
        value: initialValue?.operation_catagory_id?.id??"",
        error: false,
        success: false,
    });
    const [hikeRate, setHikeRate] = useState<ISubmitResult>({
        value: initialValue.percentage
            ? initialValue.percentage : "",
        error: false,
        success: false,
    });

    const [slabRange, setSlabRange] = useState<ISubmitResult>({
        value: initialValue?.slab_range
            ? initialValue.slab_range : "",
        error: false,
        success: false,
    });
    const [effectDate, setEffectDate] = useState<ISubmitResult>({
        value: initialValue.effective_from
            ? moment(initialValue.effective_from).format('YYYY-MM-DD') : "",
        error: false,
        success: false,
    });

    const [rangeState, setRangeState] = React.useState<boolean>(
        initialValue?.slab_range && initialValue?.slab_range === 999999999 ? true : false
    );

    console.log(rangeState)
    console.log("initialValue", initialValue)
    
    let initNight = initialValue?.slab_range === 999999999 ? true : false;

    let isValueNOTChanged =
        slabName.value === initialValue?.name &&
        operationName.value === initialValue?.operation_catagory_id?.id &&
        hikeRate.value === initialValue?.percentage &&
        effectDate.value === initialValue?.effective_from &&
        slabRange.value === initialValue?.slab_range &&
        rangeState === initNight;

    const disable =
        slabName.error ||
        effectDate.error ||
        operationName.error ||
        hikeRate.error ||
        (!rangeState && slabRange.error) || 

        slabName.value === "" ||
        effectDate.value === "" ||
        operationName.value === "" ||
        hikeRate.value === "" ||
        (!rangeState &&  slabRange.value === "")   ||
        
        (slabName.success === false &&
            operationName.success === false &&
            hikeRate.success === false &&
            (!rangeState && slabRange.success === false) &&
            effectDate.success === false 
            // !rangeState
            ) ||
        isValueNOTChanged;

        
    const handleChangeSlabName = (value: ISubmitResult) => {
        setErrorMessage("");
        setSlabName(value);
    };
    const handleChangeOperations = (value: ISubmitResult) => {
        setErrorMessage("");
        setOperationName(value)
    }

    const handleChangeHike = (value: ISubmitResult) => {
        setErrorMessage("");
        setHikeRate(value)
    }

    const handleChangeDate = (value: ISubmitResult) => {
        setErrorMessage("");
        setEffectDate(value)
    }
    const handleChangeRange = (value: ISubmitResult) => {
        setErrorMessage("");
        setSlabRange(value);
    }

    const handleCheackMax = (event: SyntheticEvent<Element, Event>, checked: boolean) => {
        setRangeState(checked);
    }

    const handleSubmitForm = () => {
        const data = {
            name: slabName.value,
            effective_from: moment(effectDate.value).format('YYYY-MM-DD'),
            operation_catagory_id: operationName.value,
            percentage: parseFloat(hikeRate.value),
            cap_at: 0,
            is_active: initialValue?.is_active,
            empty_slab_range: rangeState,
            slab_range: rangeState ? 0 : parseInt(slabRange.value)
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
                title={clickedBtn === "add" ? ADDBTNLABEL : UPDATEBTNLABEL}
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
                        placeholder={SLABPLACEHOLDER}
                        label={SLABLABEL}
                        Value={slabName.value}
                        onChangeText={handleChangeSlabName}
                        Required={true}
                        CustomErrorLine={SLABCUSTOMERR}
                    />
                    <FormTextField
                        type="percentage"
                        label={HIKELABEL}
                        placeholder={HIKEPLACEHOLDER}
                        Value={hikeRate.value}
                        onChangeText={handleChangeHike}
                        Required={true}
                        CustomErrorLine={HIKECUSTOMERR}
                    />
                    <FormTextField
                        type="date"
                        placeholder={DATEPLACEHOLDER}
                        label={DATELABEL}
                        Value={effectDate.value}
                        onChangeText={handleChangeDate}
                        Required={true}
                        CustomErrorLine={DATECUSTOMERR}
                    />
                    <FormTextDropdown
                        
                        Value={operationName.value}
                        onSelect={handleChangeOperations}
                        placeholder={OPERATIONPLACEHOLDER}
                        label={OPERATIONLABEL}
                        CustomErrorLine={OPERATIONCUSTOMERR}
                        multiSelect={false}
                        Required={true}
                        disable={false}
                        Options={operationList}
                    />
                    
                    <FormTextField
                        hidden={rangeState}
                        type="num"
                        placeholder={RANGEPLACEHOLDER}
                        label={RANGELABEL}
                        Value={slabRange.value}
                        onChangeText={handleChangeRange}
                        Required={!rangeState}
                        CustomErrorLine={RANGECUSTOMERR}
                    />
                    <FormControlLabel
                        value={rangeState}
                        control={<Checkbox checked={rangeState} />}
                        label="Max"
                        labelPlacement="end"
                        onChange={handleCheackMax}
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

export default IncentiveSlab;
