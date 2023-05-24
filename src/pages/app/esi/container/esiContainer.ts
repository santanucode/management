import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import MasterEsi from '../component/esi';
import { fetchAllEsi, fetchCreateEsi, fetchDeleteEsi, fetchUpdateEsi } from '../service/esiSlice';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getEsi: boolean,
    success_getEsi: boolean,
    error_getEsi: string | boolean | undefined;

    loading_createEsi: boolean,
    success_createEsi: boolean,
    error_createEsi: string | boolean | undefined;

    loading_updateEsi: boolean,
    success_updateEsi: boolean,
    error_updateEsi: string | boolean | undefined;

    loading_deleteEsi: boolean,
    success_deleteEsi: boolean,
    error_deleteEsi: string | boolean | undefined;

    esiList: [],
    role_function: RoleFunDTO | undefined
    
}

interface DispatchProps {
    getAllEsi(): void;
    createEsi(data: any): void;
    updateEsi(data: any): void;
    deleteEsi(data: any): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getEsi: state.esi.error_getEsi,
        loading_getEsi: state.esi.loading_getEsi,
        success_getEsi: state.esi.success_getEsi,
        error_createEsi: state.esi.error_createEsi,
        loading_createEsi: state.esi.loading_createEsi,
        success_createEsi: state.esi.success_createEsi,
        error_updateEsi: state.esi.error_updateEsi,
        loading_updateEsi: state.esi.loading_updateEsi,
        success_updateEsi: state.esi.success_updateEsi,
        loading_deleteEsi: state.esi.loading_deleteEsi,
        success_deleteEsi: state.esi.success_deleteEsi,
        error_deleteEsi: state.esi.error_deleteEsi,
        esiList: state.esi.esiList,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllEsi: () => {
            dispatch(fetchAllEsi());
        },
        createEsi: (data: any) => {
            dispatch(fetchCreateEsi(data));
        },
        updateEsi: (data: any) => {
            dispatch(fetchUpdateEsi(data));
        },
        deleteEsi: (data: any) => {
            dispatch(fetchDeleteEsi(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface EsiProps extends StateProps, DispatchProps { }
export const EsiComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterEsi);