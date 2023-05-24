import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import Home from '../component/Home';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps {
    role_function: RoleFunDTO | undefined
}

interface DispatchProps {
    getRoleFuncn(): void
}
const mapStateToProps = (state: RootState): StateProps => {
    return {
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface HomeProps extends StateProps, DispatchProps { }
export const HomeComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);