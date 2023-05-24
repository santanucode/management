import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import UserRole from '../component/role';
import { fetchAllRoles, fetchCreateRole, fetchUpdateRole, fetchUpdateStatusRole } from '../service/rolesSlice';
import { GETROLEDT } from '../service/types';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    error_getRole: string | boolean | undefined;
    loading_getRole: boolean;
    success_getRole: boolean;
    error_createRole: string | boolean | undefined;
    loading_createRole: boolean;
    success_createRole: boolean;
    error_updateRole: string | boolean | undefined;
    loading_updateRole: boolean;
    success_updateRole: boolean;
    roles: GETROLEDT | null;
    loading_updateStatusRole: boolean;
    error_updateStatusRole: string | boolean | undefined;
    success_updateStatusRole: boolean;
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getAllRoles(): void;
    createRole(data: any): void;
    updateRole(data: any): void;
    updateStatusRole(data: any): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getRole: state.roles.error_getRole,
        loading_getRole: state.roles.loading_getRole,
        success_getRole: state.roles.success_getRole,
        roles: state.roles.roles,
        loading_createRole: state.roles.loading_createRole,
        error_createRole: state.roles.error_createRole,
        success_createRole: state.roles.success_createRole,
        loading_updateRole: state.roles.loading_updateRole,
        error_updateRole: state.roles.error_updateRole,
        success_updateRole: state.roles.success_updateRole,
        loading_updateStatusRole: state.roles.loading_updateStatusRole,
        error_updateStatusRole: state.roles.error_updateStatusRole,
        success_updateStatusRole: state.roles.success_updateStatusRole,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllRoles: () => {
            dispatch(fetchAllRoles());
        },
        createRole: (data: any) => {
            dispatch(fetchCreateRole(data));
        },
        updateRole: (data: any) => {
            dispatch(fetchUpdateRole(data));
        },
        updateStatusRole: (data: any) => {
            dispatch(fetchUpdateStatusRole(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }

    };
};
export interface RolesProps extends StateProps, DispatchProps { }
export const RolesComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserRole);