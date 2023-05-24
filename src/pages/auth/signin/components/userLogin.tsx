import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { User, Lock1, Eye, EyeSlash } from "iconsax-react";
import InputAdornment from "@mui/material/InputAdornment";
import logo from "../../../../assets/images/OSL-Logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@mui/material";
import {
  LOGINHEADING,
  LOGINIDREQUIRED,
  LOGINPASSWORDREQUIRED,
  LOGINSUBHEAD,
  SUBMITLOGIN,
} from "../container/signinString";
import Loader from "components/common/Loader/Loader";
import { LoginDTO, SINGINPROPSDTO } from "../service/types";
import { UserSigninProps } from "../container/signinContainer";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required(LOGINIDREQUIRED),
    password: yup.string().required(LOGINPASSWORDREQUIRED),
  })
  .required();

const UserSignIn = (props: UserSigninProps) => {
  const {
    userLogin,
    loading,
    isLogin,
    error,
    userDetails,
    error_getAllFunction,
    functionsList,
    // getAllFunctions,
    loading_getAllFunction,
    success_getAllFunction,
    getRoleFuncn
  } = props;


  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState<any>(null);
  const [isLoader, setIsLoader] = React.useState(false);
  const [userData, setUserData] = React.useState<LoginDTO>();

  React.useEffect(() => {
    if (isLogin) {
      setIsLoader(false);
      const user = {
        login_id: userData?.login_id,
        token: userDetails?.token,
      };
      localStorage.setItem("user", JSON.stringify(user));
      getRoleFuncn()
      navigate("/");
      window.location.reload();
      navigate("/");
    } else if (error) {
      console.log("error--->",error)
      setErrorMessage(error);
      setIsLoader(false);
    }
  }, [isLogin, error]);

  React.useEffect(() => {
    const isLoading = loading;
    setIsLoader(isLoading);
  }, [loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // function handleChange() {
  //   setErrorMessage(null)
  //   handleChangeRecover()
  // }

  const onSubmit = (data: IFormInputs) => {
    if (data.email && data.password) {
      const value = {
        login_id: data?.email,
        password: data?.password,
      };
      setUserData(value);
      setIsLoader(true);
      userLogin(value);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setErrorMessage(null);
  };

  return (
    <>
      {isLoader && <Loader />}
      <Card
        sx={{
          minWidth: 435,
          textAlign: "center",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <CardContent>
          <img src={logo} />
          <Typography variant="h5" component="div" sx={{ margin: 2 }}>
            {LOGINHEADING}
          </Typography>

          <Typography
            sx={{ fontSize: 14, marginBottom: 5 }}
            color="text.secondary"
            gutterBottom
          >
            {LOGINSUBHEAD}
          </Typography>

          <Stack
            component="form"
            sx={{
              width: "100%",
            }}
            spacing={2}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Email Address"
              type="email"
              className="logininput"
              {...register("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size="16" color="#6E7079" />
                  </InputAdornment>
                ),
              }}
            />
            <span className="text-error">{errors.email?.message}</span>

            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Password"
              {...register("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock1 size="16" color="#6E7079" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <EyeSlash size="16" color="#6E7079" />
                      ) : (
                        <Eye size="16" color="#6E7079" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />
            <span className="text-error">{errors.password?.message}</span>
            <span className="error_msg">{errorMessage}</span>
            <div>
              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#4fb795", padding: "10px 70px" }}
              >
                {SUBMITLOGIN}
              </Button>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
export default UserSignIn;
