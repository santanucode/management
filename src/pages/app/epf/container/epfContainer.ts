import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import MasterEpf from '../component/epf';
import { fetchAllEpf, fetchCreateEpf, fetchDeleteEpf, fetchUpdateEpf } from '../service/epfSlice';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getEpf: boolean,
    success_getEpf: boolean,
    error_getEpf: string | boolean | undefined;

    loading_createEpf: boolean,
    success_createEpf: boolean,
    error_createEpf: string | boolean | undefined;

    loading_updateEpf: boolean,
    success_updateEpf: boolean,
    error_updateEpf: string | boolean | undefined;

    loading_deleteEpf: boolean,
    success_deleteEpf: boolean,
    error_deleteEpf: string | boolean | undefined;

    epfList: [],
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAllEpf(): void;
    createEpf(data: any): void;
    updateEpf(data: any): void;
    deleteEpf(data: any): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getEpf: state.epf.error_getEpf,
        loading_getEpf: state.epf.loading_getEpf,
        success_getEpf: state.epf.success_getEpf,
        error_createEpf: state.epf.error_createEpf,
        loading_createEpf: state.epf.loading_createEpf,
        success_createEpf: state.epf.success_createEpf,
        error_updateEpf: state.epf.error_updateEpf,
        loading_updateEpf: state.epf.loading_updateEpf,
        success_updateEpf: state.epf.success_updateEpf,
        loading_deleteEpf: state.epf.loading_deleteEpf,
        success_deleteEpf: state.epf.success_deleteEpf,
        error_deleteEpf: state.epf.error_deleteEpf,
        epfList: state.epf.epfList,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllEpf: () => {
            dispatch(fetchAllEpf());
        },
        createEpf: (data: any) => {
            dispatch(fetchCreateEpf(data));
        },
        updateEpf: (data: any) => {
            dispatch(fetchUpdateEpf(data));
        },
        deleteEpf: (data: any) => {
            dispatch(fetchDeleteEpf(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface EpfProps extends StateProps, DispatchProps { }
export const EpfComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterEpf);