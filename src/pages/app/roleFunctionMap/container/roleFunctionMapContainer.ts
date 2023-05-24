import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import RoleFunctionMapping from '../component/roleFunctionMap';
import { fetchAllFunctions, fetchAllRoleFunctionsMap, fetchAllRoles, fetchCreateRoleFunctionMap } from '../service/roleFunctionMapSlice';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    loading_getAllRoleFunctionMap: boolean;
    success_getAllRoleFunctionMap: boolean;
    error_getAllRoleFunctionMap: string | boolean | undefined;

    error_createRoleFunctionMap: string | boolean | undefined;
    loading_createRoleFunctionMap: boolean;
    success_createRoleFunctionMap: boolean;

    error_getRole: string | boolean | undefined;
    loading_getRole: boolean;
    success_getRole: boolean;

    loading_getAllFunction: boolean;
    success_getAllFunction: boolean;
    error_getAllFunction: string | boolean | undefined;

    functionsList: any;
    rolefunctionslist: any;
    roles: any;
    role_function: RoleFunDTO | undefined

}

interface DispatchProps {
    getAllRoles(): void;
    getAllFunctions(): void;
    getAllRoleFunctionMap(): void;
    createRoleFunctionMap(data: any): void
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        error_getAllFunction: state.rolefunctionmap.error_getAllFunction,
        loading_getAllFunction: state.rolefunctionmap.loading_getAllFunction,
        success_getAllFunction: state.rolefunctionmap.success_getAllFunction,

        error_getRole: state.rolefunctionmap.error_getRole,
        loading_getRole: state.rolefunctionmap.loading_getRole,
        success_getRole: state.rolefunctionmap.success_getRole,

        loading_createRoleFunctionMap: state.rolefunctionmap.loading_createRoleFunctionMap,
        error_createRoleFunctionMap: state.rolefunctionmap.error_createRoleFunctionMap,
        success_createRoleFunctionMap: state.rolefunctionmap.success_createRoleFunctionMap,

        loading_getAllRoleFunctionMap: state.rolefunctionmap.loading_getAllRoleFunctionMap,
        error_getAllRoleFunctionMap: state.rolefunctionmap.error_getAllRoleFunctionMap,
        success_getAllRoleFunctionMap: state.rolefunctionmap.success_getAllRoleFunctionMap,

        functionsList: state.rolefunctionmap.functionsList,
        rolefunctionslist: state.rolefunctionmap.rolefunctionslist,
        roles: state.rolefunctionmap.roles,
        role_function: state.userLogin.role_function

    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllRoles: () => {
            dispatch(fetchAllRoles());
        },
        getAllFunctions: () => {
            dispatch(fetchAllFunctions());
        },
        getAllRoleFunctionMap: () => {
            dispatch(fetchAllRoleFunctionsMap());
        },
        createRoleFunctionMap: (data: any) => {
            dispatch(fetchCreateRoleFunctionMap(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface RoleFunctionMapProps extends StateProps, DispatchProps { }
export const RoleFunctionMapComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoleFunctionMapping);