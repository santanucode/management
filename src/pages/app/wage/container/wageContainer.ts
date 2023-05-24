import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import BasicWage from '../component/wage';
import { CREATEDT, UPDATEDT } from '../service/types';
import { fetchAllWage, fetchCreateWage, fetchUpdateStatusWage, fetchUpdateWage } from '../service/wageSlice';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getWage: boolean,
    success_getWage: boolean,
    error_getWage: string | boolean | undefined;

    loading_createWage: boolean,
    success_createWage: boolean,
    error_createWage: string | boolean | undefined;

    loading_updateWage: boolean,
    success_updateWage: boolean,
    error_updateWage: string | boolean | undefined;

    loading_statusWage: boolean,
    success_statusWage: boolean,
    error_statusWage: string | boolean | undefined;

    wageList: [],
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAllWage(): void;
    createWage(data: CREATEDT): void;
    updateWage(data: UPDATEDT): void;
    updateStatusWage(data: UPDATEDT): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getWage: state.wage.error_getWage,
        loading_getWage: state.wage.loading_getWage,
        success_getWage: state.wage.success_getWage,
        error_createWage: state.wage.error_createWage,
        loading_createWage: state.wage.loading_createWage,
        success_createWage: state.wage.success_createWage,
        error_updateWage: state.wage.error_updateWage,
        loading_updateWage: state.wage.loading_updateWage,
        success_updateWage: state.wage.success_updateWage,
        loading_statusWage: state.wage.loading_statusWage,
        success_statusWage: state.wage.success_statusWage,
        error_statusWage: state.wage.error_statusWage,
        wageList: state.wage.wageList,
        role_function: state.userLogin.role_function,
        
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllWage: () => {
            dispatch(fetchAllWage());
        },
        createWage: (data: CREATEDT) => {
            dispatch(fetchCreateWage(data));
        },
        updateWage: (data: UPDATEDT) => {
            dispatch(fetchUpdateWage(data));
        },
        updateStatusWage: (data: UPDATEDT) => {
            dispatch(fetchUpdateStatusWage(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface WageProps extends StateProps, DispatchProps { }
export const WageComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BasicWage);