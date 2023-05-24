import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { User, Lock1 } from 'iconsax-react';
import InputAdornment from '@mui/material/InputAdornment';
import logo from '../../../../assets/images/OSL-Logo.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInputs {
  password: string
  cpassword: string
}

const schema = yup
  .object({
    password: yup.string().required(),
    cpassword: yup.string().required(),
  })

  .required()

const ReEnterPassword = (props: any) => {
  const { handleChangeLogin } = props

  function handleChangeback() {
    handleChangeLogin()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: IFormInputs) => {
    if (data.password) {
      handleChangeLogin()
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
            Welcome back!
          </Typography>
          <Typography
            sx={{ fontSize: 14, marginBottom: 5 }}
            color="text.secondary"
            gutterBottom
          >
            Login to your account
          </Typography>

          <Stack
            component="form"
            sx={{
              width: '100%',
            }}
            spacing={2}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Password"
              variant="outlined"
              // type="password"
              size="medium"
              {...register('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock1 size="16" color="#6E7079" />
                  </InputAdornment>
                ),
              }}
            />
            <span className="text-error">{errors.password?.message}</span>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Re-Enter Password"
              variant="outlined"
              // type="password"
              size="medium"
              {...register('cpassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock1 size="16" color="#6E7079" />
                  </InputAdornment>
                ),
              }}
            />
            <span className="text-error">{errors.cpassword?.message}</span>

            <div>
              <Button
                type="submit"
                variant="contained"
                // onClick={handleChange}

                sx={{ color: "#5570F1", padding: '10px 70px' }}
              >
                Continue
              </Button>
            </div>
          </Stack>
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        ></CardActions>
        <small style={{ cursor: 'pointer' }} onClick={handleChangeback}>
          Back to login
        </small>
      </Card>
    </>
  )
}

export default ReEnterPassword
