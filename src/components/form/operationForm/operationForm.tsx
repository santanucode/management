import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import { FormProps, ISubmitResult } from './types';
import { Box } from '@mui/system';
import { MdClose } from 'react-icons/md';
import FormTextField from 'components/common/textField/textField';
import FormTextDropdown from 'components/common/textDropdown/textDropdown';
import { ADDOPERATIONLABEL, CANCELBTN, CATEGORYERR, CATEGORYLABEL, CATEGORYPLACEHOLDER, OPERATIONCUSTOMERR, OPERATIONLABEL, OPERATIONPLACEHOLDER, SAVEBTN, UPDATEBTN, UPDATEDOPERATIONLABEL } from './operationString';
import "../style.scss"

const OperationForm = (props: FormProps) => {
  const { initialValue, handleFormData, onHandleClose, clickedBtn, categoriesList, errorMessage, setErrorMessage } = props
  const [operationName, setOperationName] = useState<ISubmitResult>({
    value: initialValue.name ? initialValue.name : '',
    error: false,
    success: false,
  })
  const [categories, setCategories] = useState<any>({
    value: initialValue.operation_catagory ? initialValue.operation_catagory.id : "",
    error: false,
    success: false,
  })
  let isValueNOTChanged =
    operationName.value === initialValue.name &&
    categories.value === initialValue.categories
  let disable =
    operationName.error ||
    categories.error ||
    operationName.value === '' ||
    categories.value === '' ||
    (operationName.success === false && categories.success === false) ||
    isValueNOTChanged
  const handleChangeName = (value: ISubmitResult) => {
    setErrorMessage("")
    setOperationName(value)
  }
  const handleSelectCategories = (value: any) => {
    setErrorMessage("")
    setCategories(value);
  }
  const handleSubmitForm = () => {
    const data = {
      name: operationName.value,
      operation_catagory_id: categories.value
    }
    handleFormData(data)
  }

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={onHandleClose}>
            <MdClose />
          </IconButton>
        }
        title={clickedBtn === 'add' ? ADDOPERATIONLABEL : UPDATEDOPERATIONLABEL}
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
            placeholder={OPERATIONPLACEHOLDER}
            label={OPERATIONLABEL}
            Value={operationName.value}
            onChangeText={handleChangeName}
            Required={true}
            CustomErrorLine={OPERATIONCUSTOMERR}
          />
          <FormTextDropdown
            label={CATEGORYLABEL + " *"}
            placeholder={CATEGORYPLACEHOLDER}
            defaultValue={categories.value}
            multiSelect={false}
            Options={categoriesList}
            Required={true}
            onSelect={handleSelectCategories}
            CustomErrorLine={CATEGORYERR}
          />
        </Box>
      </CardContent>
      <CardActions className="d-flex dust justify-content-end">
        <Button size="large" variant="outlined" onClick={onHandleClose}>
          {CANCELBTN}
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={disable}
          onClick={handleSubmitForm}
        >
          {clickedBtn === 'add' ? SAVEBTN : UPDATEBTN}
        </Button>
      </CardActions>
    </Card>
  )
}

export default OperationForm;
