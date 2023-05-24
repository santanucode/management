import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { User, Lock1 } from 'iconsax-react';
import InputAdornment from '@mui/material/InputAdornment';
import logo from '../../../../assets/images/OSL-Logo.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

interface IFormInputs {
  email: string
}

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required()

const Forgotpassword = (props: any) => {
  const { handleChangePassword, handleChangeLogin } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })


  function handleChangeBackPage() {
    handleChangeLogin()
  }

  const onSubmit = (data: IFormInputs) => {
    if (data.email) {
      handleChangePassword()
    }
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 435,
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
            sx={{ fontSize: 14, marginBottom: 5 }}
            color="text.secondary"
            gutterBottom
          >
            Please Enter your email for get the OTP
          </Typography>

          <Stack
            component="form"
            sx={{
              width: '100%',
            }}
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Email Address"
              type="email"
              {...register('email')}
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size="16" color="#6E7079" />
                  </InputAdornment>
                ),
              }}
            />

            <span  className='text-error' >{errors.email?.message}</span>
            

            <div>
            <Button
            type='submit'
            variant="contained"
            sx={{ background: "#5570F1", padding: '10px 70px' }}
            // onClick={handleChange}
          >
            Send
            </Button>
            </div>

            
            


          </Stack>

          
            

          

          
        </CardContent>

        {/* <Stack
          direction="row-reverse"
          sx={{ cursor: 'pointer', marginRight: 3, marginBottom: 4 }}
        >
          <p onClick={resetpass} style={{ color: colors.btnclr }}>
            Send
          </p>
        </Stack> */}

        

        <small style={{ cursor: 'pointer' }} onClick={handleChangeBackPage}>
          Back to Login
        </small>
      </Card>
    </>
  )
}

export default Forgotpassword
