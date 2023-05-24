import { RootState, TypedDispatch } from "redux/store";
import { GETWAGEPAGEDTO } from "../service/types";
import { fetchAllGroups, fetchAllOperation, fetchAllWageReport } from "../service/wageslipSlice";
import { connect } from "react-redux";
import WageSlip from "../component/wageSlip";
import { getRole } from "pages/auth/signin/service/userSlice";
import { RoleFunDTO } from "pages/auth/signin/service/types";

interface StateProps{
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    loading_getWageReport: boolean,
    success_getWageReport: boolean,
    error_getWageReport: boolean,
    loading_getOperation: boolean,
    success_getOperation: boolean,
    error_getOperation: boolean,
    allWageReport: []
    role_function: RoleFunDTO | undefined
}


interface DispatchProps{
    getAllGroup(): void;
    getAllOperation(): void;
    getAllWageSlip(body: GETWAGEPAGEDTO): void;
    getRoleFuncn(): void
}
const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getGroup: state.wageslip.error_getGroup,
        loading_getGroup: state.wageslip.loading_getGroup,
        success_getGroup: state.wageslip.success_getGroup,
        loading_getWageReport: state.wageslip.loading_getWageReport,
        error_getWageReport: state.wageslip.error_getWageReport,
        success_getWageReport: state.wageslip.success_getWageReport,
        allWageReport: state.wageslip.allWageReport,
        loading_getOperation: state.wageslip.loading_getOperation,
        success_getOperation: state.wageslip.success_getOperation,
        error_getOperation: state.wageslip.error_getOperation,
        role_function: state.userLogin.role_function
    }
}
const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllWageSlip: (data: GETWAGEPAGEDTO) => {
            dispatch(fetchAllWageReport(data))
        },
        getAllGroup: () => {
            dispatch(fetchAllGroups());
        },
        getAllOperation: () => {
            dispatch(fetchAllOperation())
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }

    };
};

export interface wageSlipProps extends StateProps, DispatchProps { }

export const WageSlipComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(WageSlip);