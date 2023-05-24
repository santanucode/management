import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import MasterOperation from "../component/Operation";
import {
  fetchAllOperation,
  fetchCreateOperation,
  fetchOperationCate,
  fetchUpdateOperation,
  fetchStatusOperation,
} from "../service/operationSlice";
import { CREATEDT, TBLDT, UPDATEDT } from "../service/types";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps {
  error_getOptCat: string | boolean | undefined;
  loading_getOptCat: boolean;
  success_getOptCat: boolean;

  error_getOperation: string | boolean | undefined;
  loading_getOperation: boolean;
  success_getOperation: boolean;

  error_createOperation: string | boolean | undefined;
  loading_createOperation: boolean;
  success_createOperation: boolean;

  loading_updateOperation: string | boolean | undefined;
  error_updateOperation: boolean;
  success_updateOperation: boolean;

  loading_statusOperation: string | boolean | undefined;
  error_statusOperation: boolean | string;
  success_statusOperation: boolean;

  operationList?: TBLDT[] | null;
  role_function: RoleFunDTO | undefined

}

interface DispatchProps {
  getAllOperaionCategory(): void;
  getAllOperation(): void;
  createOperation(data: CREATEDT): void;
  updateOperation(data: UPDATEDT): void;
  statusOperation(data: UPDATEDT): void;
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getOptCat: state.operation.error_getOptCat,
    loading_getOptCat: state.operation.loading_getOptCat,
    success_getOptCat: state.operation.success_getOptCat,

    error_getOperation: state.operation.error_getOperation,
    loading_getOperation: state.operation.loading_getOperation,
    success_getOperation: state.operation.success_getOperation,

    operationList: state.operation.operationList,

    loading_createOperation: state.operation.loading_createOperation,
    error_createOperation: state.operation.error_createOperation,
    success_createOperation: state.operation.success_createOperation,

    loading_updateOperation: state.operation.loading_updateOperation,
    error_updateOperation: state.operation.error_updateOperation,
    success_updateOperation: state.operation.success_updateOperation,

    loading_statusOperation: state.operation.loading_statusOperation,
    error_statusOperation: state.operation.error_statusOperation,
    success_statusOperation: state.operation.success_statusOperation,
    role_function: state.userLogin.role_function
  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getAllOperaionCategory: () => {
      dispatch(fetchOperationCate());
    },
    getAllOperation: () => {
      dispatch(fetchAllOperation());
    },
    createOperation: (data) => {
      dispatch(fetchCreateOperation(data));
    },
    updateOperation: (data) => {
      dispatch(fetchUpdateOperation(data));
    },
    statusOperation: (data) => {
      dispatch(fetchStatusOperation(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface OperationProps extends StateProps, DispatchProps {}
export const OperationComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterOperation);
