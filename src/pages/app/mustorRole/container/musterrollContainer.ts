import { RootState, TypedDispatch } from "redux/store";
import { GETMUSTERDTO } from "../service/types";
import { WageSlipInitDTO } from "pages/app/wageSlip/service/types";
import { fetchAllGroups, fetchAllMusterRoll } from "../service/musterrollslice";
import { connect } from "react-redux";
import MustorRole from "../component/MusterRole";
import { RoleFunDTO } from "pages/auth/signin/service/types";
import { getRole } from "pages/auth/signin/service/userSlice";

interface StateProps{
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_getGroup: string | boolean | undefined;
    loading_getMusterRoll: boolean;
    success_getMusterRoll: boolean;
    error_getMusterRoll: boolean;
    allMusterRoll: []
    role_function: RoleFunDTO | undefined
}

interface DispatchProps{
    getAllGroup(): void;
    getAllMusterRoll(body: GETMUSTERDTO): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getGroup: state.musterroll.error_getGroup,
        loading_getGroup: state.musterroll.loading_getGroup,
        success_getGroup: state.musterroll.success_getGroup,
        loading_getMusterRoll: state.musterroll.loading_getMusterRoll,
        error_getMusterRoll: state.musterroll.error_getMusterRoll,
        success_getMusterRoll: state.musterroll.success_getMusterRoll,
        allMusterRoll: state.musterroll.allMusterRoll,
        role_function: state.userLogin.role_function
    }
}

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllMusterRoll: (data: GETMUSTERDTO) => {
            dispatch(fetchAllMusterRoll(data))
        },
        getAllGroup: () => {
            dispatch(fetchAllGroups());
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }

    };
};

export interface musterRollProps extends StateProps, DispatchProps { }

export const MusterRollComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MustorRole);