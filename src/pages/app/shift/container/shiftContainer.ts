import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import MasterShift from "../component/shift";
import {
  fetchAllShift,
  fetchCreateReviseshift,
  fetchCreateShift,
  fetchUpdateReviseshift,
  fetchUpdateshift,
  fetchUpdateStatusshift,
} from "../service/shiftSlice";
import { CREATESHIFTDT, SHIFTTBLDT } from "../service/types";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps {
  error_getShift: string | boolean | undefined;
  loading_getShift: boolean;
  success_getShift: boolean;
  error_createShift: string | boolean | undefined;
  loading_createShift: boolean;
  success_createShift: boolean;
  error_updateShift: string | boolean | undefined;
  loading_updateShift: boolean;
  success_updateShift: boolean;
  error_updateStatusShift: string | boolean | undefined;
  loading_updateStatusShift: boolean;
  success_updateStatusShift: boolean;
  error_createReviseShift: string | boolean | undefined;
  loading_createReviseShift: boolean;
  success_createReviseShift: boolean;

  error_updateReviseShift: string | boolean | undefined;
  loading_updateReviseShift: boolean;
  success_updateReviseShift: any;

  shiftList: SHIFTTBLDT[] | null;
  role_function: RoleFunDTO | undefined
}

interface DispatchProps {
  getAllShift(): void;
  createShift(data: CREATESHIFTDT): void;
  updateShift(data: any): void;
  updateStatusShift(data: any): void;
  createReviseShift(data: any): void;
  updateReviseShift(data: any): void;
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getShift: state.shift.error_getShift,
    loading_getShift: state.shift.loading_getShift,
    success_getShift: state.shift.success_getShift,
    shiftList: state.shift.shiftList,
    loading_createShift: state.shift.loading_createShift,
    error_createShift: state.shift.error_createShift,
    success_createShift: state.shift.success_createShift,
    loading_updateShift: state.shift.loading_updateShift,
    error_updateShift: state.shift.error_updateShift,
    success_updateShift: state.shift.success_updateShift,
    loading_updateStatusShift: state.shift.loading_updateStatusShift,
    error_updateStatusShift: state.shift.error_updateStatusShift,
    success_updateStatusShift: state.shift.success_updateStatusShift,
    error_createReviseShift: state.shift.error_createReviseShift,
    loading_createReviseShift: state.shift.loading_createReviseShift,
    success_createReviseShift: state.shift.success_createReviseShift,
    error_updateReviseShift: state.shift.error_updateReviseShift,
    loading_updateReviseShift: state.shift.loading_updateReviseShift,
    success_updateReviseShift: state.shift.success_updateReviseShift,
    role_function: state.userLogin.role_function
  };
};
const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getAllShift: () => {
      dispatch(fetchAllShift());
    },
    createShift: (data: any) => {
      dispatch(fetchCreateShift(data));
    },
    updateShift: (data: any) => {
      dispatch(fetchUpdateshift(data));
    },
    updateStatusShift: (data: any) => {
      dispatch(fetchUpdateStatusshift(data));
    },
    createReviseShift: (data: any) => {
      dispatch(fetchCreateReviseshift(data));
    },
    updateReviseShift: (data: any) => {
      dispatch(fetchUpdateReviseshift(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface ShiftProps extends StateProps, DispatchProps {}
export const ShiftComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MasterShift);
