import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import MasterGroup from '../component/MasterGroup';
import { fetchAllGroups, fetchCreateGroup, fetchStatusChangeStaff, fetchUpdateGroup } from '../service/groupSlice';
import { CREATEGROUPDT, GETGROUPDT, UPDATEGROUPDT } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    error_getGroup: string | boolean | undefined;
    loading_getGroup: boolean;
    success_getGroup: boolean;
    error_createGroup: string | boolean | undefined;
    loading_createGroup: boolean;
    success_createGroup: boolean;
    loading_updateGroup: boolean;
    error_updateGroup: string | boolean | undefined;
    success_updateGroup: boolean;
    loading_statusStaff: boolean;
    success_statusStaff: boolean;
    error_statusStaff: string | boolean | undefined;
    groupList: GETGROUPDT | null;
    homeList: any;
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAllGroups(): void;
    createGroup(data: CREATEGROUPDT): void
    updateGroup(data: UPDATEGROUPDT): void
    statusChangeGroup(data: UPDATEGROUPDT): void
    getRoleFuncn(): void
}
const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getGroup: state.groups.error_getGroup,
        loading_getGroup: state.groups.loading_getGroup,
        success_getGroup: state.groups.success_getGroup,
        groupList: state.groups.groupList,
        loading_createGroup: state.groups.loading_createGroup,
        error_createGroup: state.groups.error_createGroup,
        success_createGroup: state.groups.success_createGroup,
        loading_updateGroup: state.groups.loading_updateGroup,
        error_updateGroup: state.groups.error_updateGroup,
        success_updateGroup: state.groups.success_updateGroup,
        loading_statusStaff: state.groups.loading_statusStaff,
        success_statusStaff: state.groups.success_statusStaff,
        error_statusStaff: state.groups.error_statusStaff,
        homeList: state.home.role_function,
        role_function: state.userLogin.role_function
    };
};
const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllGroups: () => {
            dispatch(fetchAllGroups());
        },
        createGroup: (data: CREATEGROUPDT) => {
            dispatch(fetchCreateGroup(data));
        },
        updateGroup: (data: UPDATEGROUPDT) => {
            dispatch(fetchUpdateGroup(data));
        },
        statusChangeGroup: (data: UPDATEGROUPDT) => {
            dispatch(fetchStatusChangeStaff(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
        
    };
};
export interface GroupProps extends StateProps, DispatchProps { }
export const GroupComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MasterGroup);