import { Home } from 'pages/app/home';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';
import { connect } from 'react-redux';
import { RootState, TypedDispatch } from 'redux/store';
import SideNav from '..';

interface StateProps {
    role_function: RoleFunDTO | undefined
}
interface DispatchProps {
    // getRoleFuncn(): void
}
const mapStateToProps = (state: RootState): StateProps => {
    return {
        role_function: state.userLogin.role_function
    };
};
const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        // getRoleFuncn: () => {
        //     dispatch(getRole());
        //   }
    };
};
export interface HomeSideBarProps extends StateProps, DispatchProps { }
export const HomeSideBarComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SideNav);