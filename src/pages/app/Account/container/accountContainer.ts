import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import MyAccount from "../component/Account";
import {
  fetchChangePassword,
  fetchUpdateUser,
  fetchUserDeatils,
} from "../service/accountSlice";
import { DispatchProps, StateProps } from "../service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getUser: state.accountdetails.error_getUser,
    loading_getUser: state.accountdetails.loading_getUser,
    success_getUser: state.accountdetails.success_getUser,

    userDetail: state.accountdetails.userDetail,

    loading_updateUser: state.accountdetails.loading_updateUser,
    error_updateUser: state.accountdetails.error_updateUser,
    success_updateUser: state.accountdetails.success_updateUser,

    loading_updatePassword: state.accountdetails.loading_updatePassword,
    error_updatePassword: state.accountdetails.error_updatePassword,
    success_updatePassword: state.accountdetails.success_updatePassword,
    role_function: state.userLogin.role_function
  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getUserDetails: () => {
      dispatch(fetchUserDeatils());
    },
    updateUser: (data) => {
      dispatch(fetchUpdateUser(data));
    },
    changePassword: (data) => {
      dispatch(fetchChangePassword(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface AccountProps extends StateProps, DispatchProps {}

export const AccountComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);
