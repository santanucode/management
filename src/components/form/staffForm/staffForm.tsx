import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup } from '@mui/material';
import FormTextDropdown from 'components/common/textDropdown/textDropdown';
import FormTextField from 'components/common/textField/textField';
import { MdClose } from 'react-icons/md';
import { BANKACERR, BANKACLABEL, BANKACPLACEHOLDER, BANKERR, BANKLABEL, BANKPLACEHOLDER, CANCELBTN, EMPCODECUSTOMERR, EMPCODELABEL, EMPCODEPLACEHOLDER, EMPCUSTOMERR, EMPLABEL, EMPPLACEHOLDER, EPFERR, EPFLABEL, EPFPLACEHOLDER, ESIERR, ESILABEL, ESIPLACEHOLDER, FROUPPLACEHOLDER, GROUPERR, GROUPLABEL, INCERR, INCLABEL, INCPLACEHOLDER, SAVEBTN, STAFF_ADD_HEADER, STAFF_EDIT_HEADER, UANERR, UANLABEL, UANPLACEHOLDER, UDAIERR, UDAILABEL, UDAIPLACEHOLDER, UNIONERR, UNIONLABEL, UNIONPLACEHOLDER, UPDATEBTN } from './staffFormString';
import { FORMPROPS, ISubmitResult } from './types';
import "../style.scss"


const StaffForm = (props: FORMPROPS | any) => {
    const {
        initialValue = {},
        handleFormData,
        onHandleClose,
        clickedBtn,
        groupLists,
        bankList,
        genderList,
        errorMessage,
        setErrorMessage
    } = props;

    React.useEffect(() => {
        document.addEventListener("keydown", function (event: any) {
          if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
          }
        });
      }, []);



    
    const [name, setEmpName] = useState<ISubmitResult>({
        value: initialValue.name
            ? initialValue.name : "",
        error: false,
        success: false,
    });

    const [employee_code, setEmployee_code] = useState<ISubmitResult>({
        value: initialValue.code
            ? initialValue.code : "",
        error: false,
        success: false,
    });

    const [union_serial_number, setUnion_serial_number] = useState<ISubmitResult>({
        value: initialValue.union_serial_number
            ? initialValue.union_serial_number : "",
        error: false,
        success: false,
    });
    const [emp_group, setEmp_group] = useState<ISubmitResult>({
        value: initialValue.group_id
            ? initialValue.group_id.id : null,
        error: false,
        success: false,
    });

    const [aadhar_number, setAadhar_number] = useState<ISubmitResult>({
        value: initialValue.aadhar_number
            ? initialValue.aadhar_number : "",
        error: false,
        success: false,
    });
    const [universal_account_number, setUniversal_account_number] = useState<ISubmitResult>({
        value: initialValue.universal_account_number
            ? initialValue.universal_account_number : "",
        error: false,
        success: false,
    });
    const [emp_Bank, setEmp_Bank] = useState<ISubmitResult>({
        value: initialValue.bank_id
            ? initialValue.bank_id.id : "",
        error: false,
        success: false,
    });
    const [bank_acc_number, setBank_acc_number] = useState<ISubmitResult>({
        value: initialValue.bank_acc_number
            ? initialValue.bank_acc_number : "",
        error: false,
        success: false,
    });
    const [epf_acc_number, setEpf_acc_number] = useState<ISubmitResult>({
        value: initialValue.epf_number
            ? initialValue.epf_number : "",
        error: false,
        success: false,
    });
    const [esi_acc_number, setEsi_acc_number] = useState<ISubmitResult>({
        value: initialValue.esi_number
            ? initialValue.esi_number : "",
        error: false,
        success: false,
    });

    const [insurance_number, setInsurance_number] = useState<ISubmitResult>({
        value: initialValue.insurance_number
            ? initialValue.insurance_number : "",
        error: false,
        success: false,
    });

    const [father_name, setfathersName] = useState<ISubmitResult>({
        value: initialValue.father_name
            ? initialValue.father_name : "",
        error: false,
        success: false,
    });
    const [gender, setGender] = useState<ISubmitResult>({
        value: initialValue.gender
            ? initialValue.gender : "",
        error: false,
        success: false,
    });
    const [dob, setDOB] = useState<ISubmitResult>({
        value: initialValue.dob
            ? initialValue.dob : "",
        error: false,
        success: false,
    });
    const [doj, setDOJ] = useState<ISubmitResult>({
        value: initialValue.doj
            ? initialValue.doj : "",
        error: false,
        success: false,
    });

    let isValueNOTChanged =
        name.value === initialValue.name &&
        employee_code.value === initialValue.code &&
        union_serial_number.value === initialValue.union_serial_number &&
        emp_group.value === initialValue.group_id.id &&
        aadhar_number.value == initialValue.aadhar_number &&
        universal_account_number.value === initialValue.universal_account_number &&
        emp_Bank.value === initialValue.bank_id.id &&
        bank_acc_number.value === initialValue.bank_acc_number &&
        epf_acc_number.value === initialValue.epf_number &&
        esi_acc_number.value === initialValue.esi_number &&
        insurance_number.value === initialValue.insurance_number &&
        father_name.value === initialValue.father_name &&
        gender.value === initialValue.gender &&
        dob.value === initialValue.dob &&
        doj.value === initialValue.doj 
        ;

    let btnDisable =
        name.error ||
        employee_code.error ||
        union_serial_number.error ||
        emp_group.error ||
        aadhar_number.error ||
        universal_account_number.error ||
        emp_Bank.error ||
        bank_acc_number.error ||
        epf_acc_number.error ||
        esi_acc_number.error ||
        insurance_number.error ||
        father_name.error ||
        gender.error ||
        dob.error ||
        doj.error ||

        name.value === "" ||
        employee_code.value === "" ||
        union_serial_number.value === "" ||
        emp_group.value === "" ||
        aadhar_number.value === "" ||
        universal_account_number.value === "" ||
        emp_Bank.value === "" ||
        bank_acc_number.value === "" ||
        epf_acc_number.value === "" ||
        esi_acc_number.value === "" ||
        insurance_number.value === "" ||
        father_name.value === "" ||
        gender.value === ""||
        dob.value === "" ||
        doj.value === ""||
        

        (name.success === false &&
            employee_code.success === false &&
            union_serial_number.success === false &&
            emp_group.success === false &&
            aadhar_number.success === false &&
            universal_account_number.success === false &&
            emp_Bank.success === false &&
            bank_acc_number.success === false &&
            epf_acc_number.success === false &&
            esi_acc_number.success === false &&
            insurance_number.success === false &&
            father_name.success === false &&
            gender.success === false &&
            dob.success === false &&
            doj.success === false 
            
        ) &&
        isValueNOTChanged;


    const handleChangeEmpName = (value: ISubmitResult) => {
        setErrorMessage("");
        setEmpName(value);
    };
    const handleChangeEmpCode = (value: ISubmitResult) => {
        setErrorMessage("");
        setEmployee_code(value);
    };
    const handleChangeUninonSlNo = (value: ISubmitResult) => {
        setErrorMessage("");
        setUnion_serial_number(value);
    };
    const handleSelectGroup = (value: ISubmitResult) => {
        setErrorMessage("");
        setEmp_group(value);
    };
    const handleChangeAadharNo = (value: ISubmitResult) => {
        setErrorMessage("");
        setAadhar_number(value);
    };
    const handleChangeUanNo = (value: ISubmitResult) => {
        setErrorMessage("");
        setUniversal_account_number(value);
    };
    const handleSelectBank = (value: ISubmitResult) => {
        setErrorMessage("");
        setEmp_Bank(value);
    };
    const handleChangeBankAcc = (value: ISubmitResult) => {
        setErrorMessage("");
        setBank_acc_number(value);
    };
    const handleChangeEpfAcc = (value: ISubmitResult) => {
        setErrorMessage("");
        setEpf_acc_number(value);
    };
    const handleChangeEsiAcc = (value: ISubmitResult) => {
        setErrorMessage("");
        setEsi_acc_number(value);
    };
    const handleChangeInsuranceAcc = (value: ISubmitResult) => {
        setErrorMessage("");
        setInsurance_number(value);
    };

    const handleChangeFathersName = (value: ISubmitResult) => {
        setErrorMessage("");
        setfathersName(value);
    };

    const handleChangeGender = (value: ISubmitResult) => {
        setErrorMessage("");
        setGender(value);
    };
    const handleChangeDOB = (value: ISubmitResult) => {
        setErrorMessage("");
        setDOB(value);
    };
    const handleChangeDOJ = ( value: any) => {
        setErrorMessage("");
        setDOJ(value);
    };
    const handleChange = (value: any) => {
        setGender(value);
    };
    
    // const [value, setValue] = React.useState('female');

    // const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setValue((event.target as HTMLInputElement).value);
    // };


    const handleSubmitForm = () => {
        const data = {
            name: name.value,
            aadhar_number: parseInt(aadhar_number.value),
            code: employee_code.value,
            union_serial_number: union_serial_number.value,
            universal_account_number: universal_account_number.value,
            insurance_number: insurance_number.value,
            father_name: father_name.value,
            gender: gender.value,
            dob: dob.value,
            doj:doj.value,
            epf_number: epf_acc_number.value,
            esi_number: esi_acc_number.value,
            bank_acc_number: bank_acc_number.value.toString(),
            bank_id: parseInt(emp_Bank.value),
            group_id: emp_group.value.toString(),

        }
        handleFormData(data);
    }

    return (
        <Card sx={{ boxShadow: "none" }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={onHandleClose}>
                        <MdClose />
                    </IconButton>
                }
                title={clickedBtn === "add" ? STAFF_ADD_HEADER : STAFF_EDIT_HEADER}
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
                    <Grid container rowSpacing={{ md: 1, xs: 1 }}
                        columnSpacing={{ md: 2, xs: 1 }}>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="textarea"
                                placeholder={EMPPLACEHOLDER}
                                label={EMPLABEL}
                                Value={name.value}
                                onChangeText={handleChangeEmpName}
                                Required={true}
                                CustomErrorLine={EMPCUSTOMERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="textarea"
                                placeholder={EMPCODEPLACEHOLDER}
                                label={EMPCODELABEL}
                                Value={employee_code.value}
                                onChangeText={handleChangeEmpCode}
                                Required={true}
                                CustomErrorLine={EMPCODECUSTOMERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="unionno"
                                placeholder={UNIONPLACEHOLDER}
                                label={UNIONLABEL}
                                Value={union_serial_number.value}
                                onChangeText={handleChangeUninonSlNo}
                                Required={true}
                                CustomErrorLine={UNIONERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextDropdown
                                Value={emp_group.value}
                                onSelect={handleSelectGroup}
                                placeholder={FROUPPLACEHOLDER}
                                label={GROUPLABEL + " *"}
                                CustomErrorLine={GROUPERR}
                                multiSelect={false}
                                Required={true}
                                disable={false}
                                Options={groupLists}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="num"
                                placeholder={UDAIPLACEHOLDER}
                                label={UDAILABEL}
                                Value={aadhar_number.value}
                                onChangeText={handleChangeAadharNo}
                                Required={true}
                                CustomErrorLine={UDAIERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="num"
                                placeholder={UANPLACEHOLDER}
                                label={UANLABEL}
                                Value={universal_account_number.value}
                                onChangeText={handleChangeUanNo}
                                Required={true}
                                CustomErrorLine={UANERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextDropdown
                                Value={emp_Bank.value}
                                onSelect={handleSelectBank}
                                placeholder={BANKPLACEHOLDER}
                                label={BANKLABEL + " *"}
                                CustomErrorLine={BANKERR}
                                multiSelect={false}
                                Required={true}
                                disable={false}
                                Options={bankList}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="alpha"
                                placeholder={BANKACPLACEHOLDER}
                                label={BANKACLABEL}
                                Value={bank_acc_number.value}
                                onChangeText={handleChangeBankAcc}
                                Required={true}
                                CustomErrorLine={BANKACERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="num"
                                placeholder={EPFPLACEHOLDER}
                                label={EPFLABEL}
                                Value={epf_acc_number.value}
                                onChangeText={handleChangeEpfAcc}
                                Required={true}
                                CustomErrorLine={EPFERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="num"
                                placeholder={ESIPLACEHOLDER}
                                label={ESILABEL}
                                Value={esi_acc_number.value}
                                onChangeText={handleChangeEsiAcc}
                                Required={true}
                                CustomErrorLine={ESIERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="textarea"
                                placeholder={INCPLACEHOLDER}
                                label={INCLABEL}
                                Value={insurance_number.value}
                                onChangeText={handleChangeInsuranceAcc}
                                Required={true}
                                CustomErrorLine={INCERR}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextField
                                type="textarea"
                                placeholder={"Father's Name"}
                                label={"Father's Name"}
                                Value={father_name.value}
                                onChangeText={handleChangeFathersName}
                                Required={true}
                                CustomErrorLine={INCERR}
                            />
                        </Grid>

                        

                        
                        
                        <Grid item xs={12} md={6}>
                        <FormTextField
                            type="date"
                            placeholder={"Date Of Birth"}
                            label={"Date Of Birth"}
                            Value={dob.value}
                            onChangeText={handleChangeDOB}
                            Required={true}
                            CustomErrorLine={"Select Date Of Joining"}
                        />
                        </Grid>

                        <Grid item xs={12} md={6}>
                        <FormTextField
                            type="date"
                            placeholder={"Date Of Joining"}
                            label={"Date Of Joining"}
                            Value={doj.value}
                            onChangeText={handleChangeDOJ}
                                Required={true}
                                CustomErrorLine={"Select Date Of joining"}
                        />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormTextDropdown
                                Value={gender.value}
                                onSelect={handleChangeGender}
                                placeholder={"Gender"}
                                label={"Gender" + " *"}
                                CustomErrorLine={"Select gender"}
                                multiSelect={false}
                                Required={true}
                                disable={false}
                                Options={genderList}
                            />
                        </Grid>
                        {/* <Grid item xs={12} md={6}>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChangeRadio}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        </Grid> */}



                    </Grid>
                </Box>
            </CardContent>
            <CardActions className='d-flex dust justify-content-end'>
                <Button size="large" variant="outlined" onClick={onHandleClose}>{CANCELBTN}</Button>
                <Button size="large" variant="contained" disabled={btnDisable} onClick={handleSubmitForm}>{clickedBtn === "add" ? SAVEBTN : UPDATEBTN}</Button>
            </CardActions>
        </Card>
    );
}

export default StaffForm;
