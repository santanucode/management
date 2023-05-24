import { connect } from 'react-redux';
import {RootState, TypedDispatch } from '../../../../redux/store';
import MasterStaff from '../component/staff';
import { fetchAllBanks, fetchAllGroups, fetchAllStaff, fetchCreateStaff, fetchStatusChangeStaff, fetchUpdateStaff } from '../service/staffSlice';
import { CREATEDT, STAFFDT, UPDATEEDT } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    error_getGroup: string | boolean | undefined;
    loading_getGroup: string | boolean | undefined
    success_getGroup: boolean;

    error_getBank: string | boolean | undefined;
    loading_getBank: boolean;
    success_getBank: boolean;
    error_getStaff: string | boolean | undefined;
    loading_getStaff: boolean;
    success_getStaff: boolean;

    error_createStaff: string | boolean | undefined;
    loading_createStaff: boolean;
    success_createStaff: boolean;

    loading_updateStaff: string | boolean | undefined;
    error_updateStaff: string | boolean | undefined;
    success_updateStaff: boolean;

    loading_statusStaff: boolean;
    success_statusStaff: boolean;
    error_statusStaff: string | boolean | undefined;

    staffList?: STAFFDT;
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAllBanks(): void;
    getAllGroups(): void;
    getAllStaff(): void;
    createStaff(data: CREATEDT): void
    updateStaff(data: UPDATEEDT): void
    statusChangeStaff(data: UPDATEEDT): void
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getGroup: state.staff.error_getGroup,
        loading_getGroup: state.staff.loading_getGroup,
        success_getGroup: state.staff.success_getGroup,

        error_getBank: state.banks.error_getBank,
        loading_getBank: state.banks.loading_getBank,
        success_getBank: state.banks.success_getBank,

        error_getStaff: state.staff.error_getStaff,
        loading_getStaff: state.staff.loading_getStaff,
        success_getStaff: state.staff.success_getStaff,

        staffList: state.staff.staffList,

        loading_createStaff: state.staff.loading_createStaff,
        error_createStaff: state.staff.error_createStaff,
        success_createStaff: state.staff.success_createStaff,

        loading_updateStaff: state.staff.loading_updateStaff,
        error_updateStaff: state.staff.error_updateStaff,
        success_updateStaff: state.staff.success_updateStaff,

        loading_statusStaff: state.staff.loading_statusStaff,
        success_statusStaff: state.staff.success_statusStaff,
        error_statusStaff: state.staff.error_statusStaff,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllBanks: () => {
            dispatch(fetchAllBanks());
        },
        getAllGroups: () => {
            dispatch(fetchAllGroups());
        },
        getAllStaff: () => {
            dispatch(fetchAllStaff());
        },
        createStaff: (data: CREATEDT) => {
            dispatch(fetchCreateStaff(data));
        },
        updateStaff: (data: UPDATEEDT) => {
            dispatch(fetchUpdateStaff(data));
        },
        statusChangeStaff: (data: UPDATEEDT) => {
            dispatch(fetchStatusChangeStaff(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface StaffProps extends StateProps, DispatchProps { }
export const StaffComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterStaff);