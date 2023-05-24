import "./style.scss";
import UserSignIn from "./userLogin";
import { SINGINPROPSDTO } from "../service/types";
import { getAllFunctions } from "../service/auth.request";
import { UserSigninProps } from "../container/signinContainer";

function Login(props: UserSigninProps) {
  const { userLogin, loading, isLogin, error, userDetails, getRoleFuncn  } = props;
  return (
    <>
      <div className="login-section ">
        <div className="backdrop d-flex justify-content-center align-items-center">
          <UserSignIn
            // handleChangeRecover={handleRecover}
            userLogin={userLogin}
            loading={loading}
            isLogin={isLogin}
            error={error}
            userDetails={userDetails}
            loading_getAllFunction={false}
            success_getAllFunction={false}
            error_getAllFunction={undefined}
            functionsList={undefined}
            getRoleFuncn={getRoleFuncn}
            // getAllFunctions={getAllFunctions}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
