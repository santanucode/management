import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import Login from "../components/auth";
import { LoginDTO, UserDetailsDTO } from "../service/types";
import {  getRole, userSignin } from "../service/userSlice";

interface StateProps {
  isLogin: boolean;
  error: string | boolean | undefined;
  loading: boolean;
  userDetails: UserDetailsDTO | null;
  loading_getAllFunction: boolean;
  success_getAllFunction: boolean;
  error_getAllFunction: string | boolean | undefined;
  functionsList: any;
}

interface DispatchProps {
  userLogin(data: LoginDTO): void;
  getRoleFuncn(): void;
  // getAllFunctions(): void;
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error: state.userLogin.error,
    loading: state.userLogin.loading,
    isLogin: state.userLogin.isLogin,
    userDetails: state.userLogin.userDetails,
    error_getAllFunction: state.userLogin.error_getAllFunction,
    loading_getAllFunction: state.userLogin.loading_getAllFunction,
    success_getAllFunction: state.userLogin.success_getAllFunction,
    functionsList:state.userLogin.functionsList
  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    userLogin: (body) => {
      dispatch(userSignin(body));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  //   getAllFunctions: () => {
  //     dispatch(fetchAllFunctions());
  // },
  };
};

export interface UserSigninProps extends StateProps, DispatchProps {}
export const UserSigninComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
