import React, { useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Switch,
} from '@mui/material';
import { Box } from '@mui/system';
import "./style.scss"
import { MdClose } from 'react-icons/md';
import { FormProps, ISubmitResult } from './types.dt';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  ADDNEWLABEL,
  BASICLABEL,
  BASICPLACEHOLDER,
  CANLABEL,
  CANPLACEHOLDER,
  CONFIGNAMEERROR,
  CONFIGNAMELABEL,
  CONFIGNAMEPLACEHOLDER,
  DALABEL,
  DAPLACEHOLDER,
  DATEERROR,
  DATELABEL,
  DATEPLACEHOLDER,
  HRALABEL,
  HRAPLACEHOLDER,
  OFFDAYLABEL,
  OFFELIGLABEL,
  SHIFTLABEL,
  SHIFTPLACEHOLDER,
  UPDATELABEL,
  WDAYBTABSENTLABEL
} from './holidayConfigString';
import "../style.scss"
import { styled } from '@mui/material/styles';
import FormTextField from 'components/common/textField/textField';
import moment from 'moment';


const OnoffSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
    borderRadius: "none"
  },
}));

const HolidayConfigForm = (props: FormProps) => {
  const {
    initialValue = {},
    handleFormData,
    onHandleClose,
    clickedBtn,
    errorMessage,
    setErrorMessage
  } = props;

  const [effectDate, setEffectDate] = useState<ISubmitResult>({
    value: initialValue.effective_from
      ? initialValue.effective_from : "",
    error: false,
    success: false,
  });
  const [configName, setConfigName] = useState<ISubmitResult>({
    value: initialValue ? initialValue.config_name : "",
    error: false,
    success: false,
  })
  const [offDay, setOffDay] = useState(
     initialValue?.config?.day_config.off_day ? initialValue?.config?.day_config.off_day : false,
  )
  console.log("offDay",offDay)
  const [offElg, setOffElg] = useState(
    initialValue?.config?.day_config.off_eligible ? initialValue?.config?.day_config.off_eligible : false,
  )
  const [workingDayButAbsent, setWorkingDayButAbsent] = useState(
    initialValue.config?.day_config.absent_day ? initialValue.config?.day_config.absent_day : false,
  )
  
  const [shifAmount, setShiftAmount] = useState<number>(
    initialValue ? initialValue.config?.wage_component.shift_allowance?.factor : 0,
  )
  const [basicAmount, setBasicAmount] = useState<number>(
    initialValue ? initialValue.config?.wage_component.basic_amount?.factor : 0,
  )
  const [daAmount, setDaAmount] = useState<number>(
    initialValue ? initialValue?.config?.wage_component.da_amount.factor : 0,
  )
  const [hraAmount, setHraAmount] = useState<number>(
    initialValue ? initialValue.config?.wage_component.hra_amount.factor : 0,
  )
  const [canAmount, setCanAmount] = useState<number>(
    initialValue ? initialValue.config?.wage_component.ca_amount.factor : 0,
  )
  const handleChangeShiftAmount = (event: any) => {
    setShiftAmount(event.target.value);
  }
  const handleChangeBasicAmount = (event: any) => {
    setBasicAmount(event.target.value);
  }
  const handleChangeDaAmount = (event: any) => {
    setDaAmount(event.target.value);
  }
  const handleChangeHraAmount = (event: any) => {
    setHraAmount(event.target.value);
  }
  const handleChangeCanAmount = (event: any) => {
    setCanAmount(event.target.value);
  }
  const handleClickOffDay = () => {
    setErrorMessage("");
    setOffDay(!offDay)
  }
  const handleClickOffElg = () => {
    setErrorMessage("");
    setOffElg(!offElg)
  }
  const handleClickExtraBasic = () => {
    setErrorMessage("");
    setWorkingDayButAbsent(!workingDayButAbsent)
  }
  const handleChangeConfigName = (value: ISubmitResult) => {
    setErrorMessage("");
    setConfigName(value)
  }
  const handleChangeDate = (value: ISubmitResult) => {
    setErrorMessage("");
    setEffectDate(value)
  }

  let isValueNOTChanged =
    offDay === initialValue.off_day &&
    offElg === initialValue.off_eligible &&
    workingDayButAbsent === initialValue.day_absent;

  let disable =
    offDay === "" ||
    offElg === "" ||
    workingDayButAbsent === "" ||
    isValueNOTChanged;

  const handleSubmitForm = () => {
    const data = {
      config_name: configName.value,
      effective_from: effectDate.value,
      config: {
        day_config: {
          off_day: offDay,
          off_eligible: offElg,
          absent_day: workingDayButAbsent
        },
        wage_component: {
          shift_allowance: {
            factor: shifAmount
          },
          basic_amount: {
            factor: basicAmount
          },
          da_amount: {
            factor: daAmount
          },
          hra_amount: {
            factor: hraAmount
          },
          ca_amount: {
            factor: canAmount
          }
        }
      },
    }

    handleFormData(data)
  }

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <CardHeader
        sx={{ textAlign: "center" }}
        action={
          <IconButton aria-label="settings" onClick={onHandleClose}>
            <MdClose />
          </IconButton>
        }
        title={clickedBtn === 'add' ? ADDNEWLABEL : UPDATELABEL}
      />
      {errorMessage?<span className='error_msg'>{errorMessage}</span>:null}
      <CardContent className='form-height'>
        <Box>
          <div className="row">
            <div className='d-flex justify-content-between'>
              <div className="col-5">
                <FormTextField
                  type="textarea"
                  placeholder={CONFIGNAMEPLACEHOLDER}
                  label={CONFIGNAMELABEL}
                  Value={configName.value}
                  onChangeText={handleChangeConfigName}
                  Required={true}
                  CustomErrorLine={CONFIGNAMEERROR}
                />
              </div>
              <div className="col-3">
                <FormTextField
                  type="Edate"
                  placeholder={DATEPLACEHOLDER}
                  label={DATELABEL}
                  Value={effectDate.value}
                  onChangeText={handleChangeDate}
                  Required={true}
                  CustomErrorLine={DATEERROR}
                />
              </div>
            </div>
          </div>
          <Grid container sx={{ borderRadius: "none" }}>
            <Grid xs={12} sx={{ borderBottom: '0.5px solid #eaeded', padding: '10px' }}>
              <div className='d-flex justify-content-between'>
                <div>
                  {OFFDAYLABEL}
                </div>
                <div>
                  <FormControlLabel
                    sx={{ borderRadius: "none" }}
                    control={<OnoffSwitch checked={offDay} onChange={handleClickOffDay} />}
                    label=""
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ borderRadius: "none" }}>
            <Grid xs={12} sx={{ borderBottom: '0.5px solid #eaeded', padding: '10px' }}>
              <div className='d-flex justify-content-between'>
                <div>
                  {OFFELIGLABEL}
                </div>
                <div>
                  <FormControlLabel
                    sx={{ borderRadius: "none" }}
                    control={<OnoffSwitch checked={offElg} onChange={handleClickOffElg} />}
                    label=""
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container sx={{ borderRadius: "none" }}>
            <Grid xs={12} sx={{ borderBottom: '0.5px solid #eaeded', padding: '10px' }}>
              <div className='d-flex justify-content-between'>
                <div>
                  {WDAYBTABSENTLABEL}
                </div>
                <div>
                  <FormControlLabel
                    sx={{ borderRadius: "none" }}
                    control={<OnoffSwitch checked={workingDayButAbsent} onChange={handleClickExtraBasic} />}
                    label=""
                  />
                </div>
              </div>
            </Grid>
          </Grid>
          <form className='mt-3'>
            <div className="form-group row">
              <label className="col-3 col-form-label">{SHIFTLABEL}<span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={SHIFTPLACEHOLDER} type="number" onChange={handleChangeShiftAmount} value={shifAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{BASICLABEL} <span> &#10005;</span></label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={BASICPLACEHOLDER} type="number" onChange={handleChangeBasicAmount} value={basicAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{DALABEL} <span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={DAPLACEHOLDER} type="number" onChange={handleChangeDaAmount} value={daAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{HRALABEL} <span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={HRAPLACEHOLDER} type="number" onChange={handleChangeHraAmount} value={hraAmount} />
              </div>
            </div>
            <div className="form-group row mt-2">
              <label className="col-3 col-form-label">{CANLABEL} <span> &#10005;</span> </label>
              <div className="col-sm-3">
                <input className="form-control" placeholder={CANPLACEHOLDER} type="number" onChange={handleChangeCanAmount} value={canAmount} />
              </div>
            </div>
          </form>
        </Box>
      </CardContent>
      <CardActions className="d-flex dust justify-content-end">
        <Button size="large" variant="outlined" onClick={onHandleClose}>
          Cancel
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={disable}
          onClick={handleSubmitForm}
        >
          {clickedBtn === 'add' ? 'Save' : 'Update'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default HolidayConfigForm
