import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import OperationCategory from "../component/OperationCategory";
import {
  fetchCreateOperationCate,
  fetchOperationCate,
  fetchUpdateOperationCate,
  fetchUpdateOperationStatusCate,
} from "../service/operationCateSlice";
import {
  CREATEOPTCATDT,
  OPERATIONCATEDT,
  UPDATEOPTCATDT,
} from "../service/types";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps {
  error_getOptCat: string | boolean | undefined;
  loading_getOptCat: boolean;
  success_getOptCat: boolean;
  error_createOptCat: string | boolean | undefined;
  loading_createOptCat: boolean;
  success_createOptCat: boolean;
  loading_updateOptCat: string | boolean | undefined;
  error_updateOptCat: string | boolean | undefined;
  success_updateOptCat: boolean;
  error_updateOptStatusCat: string | boolean | undefined;
  loading_updateOptStatusCat: boolean;
  success_updateOptStatusCat: boolean;
  opertionCategory?: OPERATIONCATEDT[] | null;
  role_function: RoleFunDTO | undefined 
}

interface DispatchProps {
  getAllOperaionCategory(): void;
  createOperaionCategory(data: CREATEOPTCATDT): void;
  updateOperaionCategory(data: UPDATEOPTCATDT): void;
  updateOperaionStatusCategory(data: UPDATEOPTCATDT): void;
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getOptCat: state.operationCate.error_getOptCat,
    loading_getOptCat: state.operationCate.loading_getOptCat,
    success_getOptCat: state.operationCate.success_getOptCat,
    opertionCategory: state.operationCate.opertionCategory,
    loading_createOptCat: state.operationCate.loading_createOptCat,
    error_createOptCat: state.operationCate.error_createOptCat,
    success_createOptCat: state.operationCate.success_createOptCat,
    loading_updateOptCat: state.operationCate.loading_updateOptCat,
    error_updateOptCat: state.operationCate.error_updateOptCat,
    success_updateOptCat: state.operationCate.success_updateOptCat,
    error_updateOptStatusCat: state.operationCate.error_updateOptStatusCat,
    loading_updateOptStatusCat: state.operationCate.loading_updateOptStatusCat,
    success_updateOptStatusCat: state.operationCate.success_updateOptStatusCat,
    role_function:state.userLogin.role_function
  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getAllOperaionCategory: () => {
      dispatch(fetchOperationCate());
    },
    createOperaionCategory: (data) => {
      dispatch(fetchCreateOperationCate(data));
    },
    updateOperaionCategory: (data) => {
      dispatch(fetchUpdateOperationCate(data));
    },
    updateOperaionStatusCategory: (data) => {
      dispatch(fetchUpdateOperationStatusCate(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface OperationCateProps extends StateProps, DispatchProps {}
export const OperationCateComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationCategory);
