import { connect } from "react-redux";
import { RootState, TypedDispatch } from "../../../../redux/store";
import Bank from "../component/bank";
import {
  fetchAllBanks,
  fetchCreateBank,
  fetchStatusChangeBank,
  fetchUpdateBank,
} from "../service/banksSlice";
import {
  BankApiDTO,
  BankStatusChangeDTO
} from "../service/types";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps {
  error_getBank: string | boolean | undefined;
  loading_getBank: boolean;
  success_getBank: boolean;
  error_createBank: string | boolean | undefined;
  loading_createBank: boolean;
  success_createBank: boolean;
  error_updateBank: string | boolean | undefined;
  loading_updateBank: boolean;
  success_updateBank: boolean;
  loading_statusBank: boolean;
  success_statusBank: boolean;
  error_statusBank: string | boolean | undefined;
  banksList?: BankApiDTO[];
  role_function: RoleFunDTO | undefined
}

interface DispatchProps {
  getAllBanks(): void;
  createBank(data: any): void;
  updateBank(data: any): void;
  statusChangeBank(data: BankStatusChangeDTO): void;
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    error_getBank: state.banks.error_getBank,
    loading_getBank: state.banks.loading_getBank,
    success_getBank: state.banks.success_getBank,
    banksList: state.banks.banksList,
    loading_createBank: state.banks.loading_createBank,
    error_createBank: state.banks.error_createBank,
    success_createBank: state.banks.success_createBank,
    loading_updateBank: state.banks.loading_updateBank,
    error_updateBank: state.banks.error_updateBank,
    success_updateBank: state.banks.success_updateBank,
    loading_statusBank: state.banks.loading_statusBank,
    success_statusBank: state.banks.success_statusBank,
    error_statusBank: state.banks.error_statusBank,
    role_function: state.userLogin.role_function
  };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getAllBanks: () => {
      dispatch(fetchAllBanks());
    },
    createBank: (data) => {
      dispatch(fetchCreateBank(data));
    },
    updateBank: (data) => {
      dispatch(fetchUpdateBank(data));
    },
    statusChangeBank: (data) => {
      dispatch(fetchStatusChangeBank(data));
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  };
};

export interface BanksProps extends StateProps, DispatchProps {}
export const BanksComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
