import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import HolidayConfig from '../component/holidayConfig';
import { fetchAllHolidayConfig, fetchCreateHolidayConfig, fetchDeleteHolidayConfig, fetchUpdateHolidayConfig} from '../service/holidayConfigSlice';
import { CREATEDT, UPDATEDT } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getHolidayConfig: boolean,
    success_getHolidayConfig: boolean,
    error_getHolidayConfig: string | boolean | undefined;

    loading_createHolidayConfig: boolean,
    success_createHolidayConfig: boolean,
    error_createHolidayConfig: string | boolean | undefined;

    loading_updateHolidayConfig: boolean,
    success_updateHolidayConfig: boolean,
    error_updateHolidayConfig: string | boolean | undefined;

    loading_deleteHolidayConfig: boolean,
    success_deleteHolidayConfig: boolean,
    error_deleteHolidayConfig: string | boolean | undefined;

    holidayConfigList: [],
    role_function: RoleFunDTO | undefined
    
}

interface DispatchProps {
    getAllHolidayConfig(): void;
    createHolidayConfig(data: CREATEDT): void;
    updateHolidayConfig(data: UPDATEDT): void;
    deleteHolidayConfig(data: UPDATEDT): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getHolidayConfig: state.holidayConfig.error_getHolidayConfig,
        loading_getHolidayConfig: state.holidayConfig.loading_getHolidayConfig,
        success_getHolidayConfig: state.holidayConfig.success_getHolidayConfig,
        error_createHolidayConfig: state.holidayConfig.error_createHolidayConfig,
        loading_createHolidayConfig: state.holidayConfig.loading_createHolidayConfig,
        success_createHolidayConfig: state.holidayConfig.success_createHolidayConfig,
        error_updateHolidayConfig: state.holidayConfig.error_updateHolidayConfig,
        loading_updateHolidayConfig: state.holidayConfig.loading_updateHolidayConfig,
        success_updateHolidayConfig: state.holidayConfig.success_updateHolidayConfig,
        loading_deleteHolidayConfig: state.holidayConfig.loading_deleteHolidayConfig,
        success_deleteHolidayConfig: state.holidayConfig.success_deleteHolidayConfig,
        error_deleteHolidayConfig: state.holidayConfig.error_deleteHolidayConfig,
        holidayConfigList: state.holidayConfig.holidayConfigList,
    role_function: state.userLogin.role_function

    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllHolidayConfig: () => {
            dispatch(fetchAllHolidayConfig());
        },
        createHolidayConfig: (data: CREATEDT) => {
            dispatch(fetchCreateHolidayConfig(data));
        },
        updateHolidayConfig: (data: UPDATEDT) => {
            dispatch(fetchUpdateHolidayConfig(data));
        },
        deleteHolidayConfig: (data: UPDATEDT) => {
            dispatch(fetchDeleteHolidayConfig(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface HolidayConfigProps extends StateProps, DispatchProps { }
export const HolidayConfigComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(HolidayConfig);