import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import Incentive from '../component/Incentive';
import { fetchAllIncentive, fetchCreateIncentive, fetchUpdateStatusIncentive, fetchUpdateIncentive,fetchOperationCate } from '../service/incentiveSlice';
import { CREATEDT, UPDATEDT } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getOperation: boolean,
    success_getOperation: boolean,
    error_getOperation: string | boolean | undefined;

    loading_getIncentive: boolean,
    success_getIncentive: boolean,
    error_getIncentive: string | boolean | undefined;

    loading_createIncentive: boolean,
    success_createIncentive: boolean,
    error_createIncentive: string | boolean | undefined;

    loading_updateIncentive: boolean,
    success_updateIncentive: boolean,
    error_updateIncentive: string | boolean | undefined;

    loading_statusIncentive: boolean,
    success_statusIncentive: boolean,
    error_statusIncentive: string | boolean | undefined;

    incentiveList: [],
    role_function: RoleFunDTO | undefined

}

interface DispatchProps {
    getAllIncentive(): void;
    createIncentive(data: CREATEDT): void;
    updateIncentive(data: UPDATEDT): void;
    updateStatusIncentive(data: UPDATEDT): void;
    getAllOperaionCategory(): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getIncentive: state.incentive.error_getIncentive,
        loading_getIncentive: state.incentive.loading_getIncentive,
        success_getIncentive: state.incentive.success_getIncentive,
        error_createIncentive: state.incentive.error_createIncentive,
        loading_createIncentive: state.incentive.loading_createIncentive,
        success_createIncentive: state.incentive.success_createIncentive,
        error_updateIncentive: state.incentive.error_updateIncentive,
        loading_updateIncentive: state.incentive.loading_updateIncentive,
        success_updateIncentive: state.incentive.success_updateIncentive,
        loading_statusIncentive: state.incentive.loading_statusIncentive,
        success_statusIncentive: state.incentive.success_statusIncentive,
        error_statusIncentive: state.incentive.error_statusIncentive,
        incentiveList: state.incentive.incentiveList,

        error_getOperation: state.operation.error_getOperation,
        loading_getOperation: state.operation.loading_getOperation,
        success_getOperation: state.operation.success_getOperation,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllIncentive: () => {
            dispatch(fetchAllIncentive());
        },
        createIncentive: (data) => {
            dispatch(fetchCreateIncentive(data));
        },
        updateIncentive: (data) => {
            dispatch(fetchUpdateIncentive(data));
        },
        updateStatusIncentive: (data) => {
            dispatch(fetchUpdateStatusIncentive(data));
        },
        getAllOperaionCategory: () => {
            dispatch(fetchOperationCate());
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface IncentiveProps extends StateProps, DispatchProps { }
export const IncentiveComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Incentive);