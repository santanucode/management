import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import OtpInput from 'react-otp-input';
import logo from '../../../../assets/images/OSL-Logo.svg';
import { useState } from 'react'


import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


interface IFormInputs {
  otp: string
}

const schema = yup
  .object({
    OtpInput: yup.number().required(),
  })
  .required()


const RecoverOtp = (props: any) => {
  
  const { handleChangeOtpPage, handleChangeRecover, handleChangeLogin } = props


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })



  function handlechangeotp() {
    handleChangeOtpPage()
  }

  function handleChangebackpage() {
    handleChangeRecover()
  }

  function handleChangeBackPage() {
    handleChangeLogin()
  }
  
  const [OTP, setOTP] = useState<any>('')

  function handleChange(OTP: any) {
    setOTP(OTP)
  }


  const onSubmit = (data: IFormInputs) => {
  }



  return (
    <>
      <Card
        sx={{
          maxWidth: 435,
          textAlign: 'center',
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <CardContent>
          <img src={logo} />
          <Typography variant="h5" component="div" sx={{ margin: 2 }}>
            Forgot Password!
          </Typography>
          <Typography
            sx={{ fontSize: 14, marginBottom: 2 }}
            color="text.secondary"
            gutterBottom
          >
            Please Enter the OTP
          </Typography>

          <Stack
            component="form"
            sx={{
              width: '50%',
              display: 'flex',
              margin: '0px auto',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <OtpInput
              {...register('otp')}
              numInputs={4}
              value={OTP}
              
              inputStyle="inputStyle"
              separator={<span>-</span>}
              onChange={handleChange}
            />

          <span className='text-error' >{errors.otp?.message}</span>

            
          
            
          </Stack>
        </CardContent>

        {OTP.length==4?<Button
          
              variant="contained"
              type="submit"
            onClick={handlechangeotp}
            sx={{ background: "#5570F1", padding: '10px 70px' }}
          >
            Continue
          </Button>:
          <Button
          disabled
              variant="contained"
              type="submit"
            onClick={handlechangeotp}
            sx={{ background: "#5570F1", padding: '10px 70px' }}
          >
            Continue
          </Button>}
        
        <Stack
          direction="row-reverse"
          sx={{ cursor: 'pointer', marginRight: 3 }}
        >
          <p onClick={handleChangebackpage} style={{ color: "#5570F1" }}>
            Resend
          </p>
        </Stack>

        {/* <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
         
          
        </CardActions> */}
        <small style={{cursor:"pointer"}} onClick={handleChangeBackPage}>Back to Login</small>
      </Card>
    </>
  )
}

export default RecoverOtp;
