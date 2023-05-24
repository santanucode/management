import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import MasterHoliday from '../component/holiday';
import { fetchAllHoliday, fetchCreateHoliday, fetchDeleteHoliday, fetchUpdateHoliday } from '../service/holidaySlice';
import { CREATEDT, UPDATEDT } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getHoliday: boolean,
    success_getHoliday: boolean,
    error_getHoliday: string | boolean | undefined;

    loading_createHoliday: boolean,
    success_createHoliday: boolean,
    error_createHoliday: string | boolean | undefined;

    loading_updateHoliday: boolean,
    success_updateHoliday: boolean,
    error_updateHoliday: string | boolean | undefined;

    loading_deleteHoliday: boolean,
    success_deleteHoliday: boolean,
    error_deleteHoliday: string | boolean | undefined;

    holidayList: [],
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAllHoliday(): void;
    createHoliday(data: CREATEDT): void;
    updateHoliday(data: UPDATEDT): void;
    deleteHoliday(data: UPDATEDT): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getHoliday: state.holiday.error_getHoliday,
        loading_getHoliday: state.holiday.loading_getHoliday,
        success_getHoliday: state.holiday.success_getHoliday,
        error_createHoliday: state.holiday.error_createHoliday,
        loading_createHoliday: state.holiday.loading_createHoliday,
        success_createHoliday: state.holiday.success_createHoliday,
        error_updateHoliday: state.holiday.error_updateHoliday,
        loading_updateHoliday: state.holiday.loading_updateHoliday,
        success_updateHoliday: state.holiday.success_updateHoliday,
        loading_deleteHoliday: state.holiday.loading_deleteHoliday,
        success_deleteHoliday: state.holiday.success_deleteHoliday,
        error_deleteHoliday: state.holiday.error_deleteHoliday,
        holidayList: state.holiday.holidayList,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllHoliday: () => {
            dispatch(fetchAllHoliday());
        },
        createHoliday: (data: CREATEDT) => {
            dispatch(fetchCreateHoliday(data));
        },
        updateHoliday: (data: UPDATEDT) => {
            dispatch(fetchUpdateHoliday(data));
        },
        deleteHoliday: (data: UPDATEDT) => {
            dispatch(fetchDeleteHoliday(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface HolidayProps extends StateProps, DispatchProps { }
export const HolidayComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterHoliday);