import { connect } from 'react-redux';
import { RootState, TypedDispatch } from "redux/store";
import { fetchAllEpfReport } from "../service/epfreportslice";
import EpfReport from '../component/epfReport';
import epfReport from '../component/epfReport';
import { RoleFunDTO } from 'pages/auth/signin/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';

interface StateProps{
    loading_getEpfReport : boolean;
    success_getEpfReport : boolean;
    error_getEpfReport : boolean;
    epfReportList: any;
    role_function: RoleFunDTO | undefined
}

interface DispatchProps{
    getEpfReport(data: any): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: RootState):StateProps => {
    return {
        loading_getEpfReport: state.epfreport.loading_getEpfReport,
        success_getEpfReport: state.epfreport.success_getEpfReport,
        error_getEpfReport: state.epfreport.error_getEpfReport,
        epfReportList: state.epfreport.epfReportList,
        role_function: state.userLogin.role_function
    };
};


const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getEpfReport:(data) =>{
            dispatch(fetchAllEpfReport(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    }
};
export interface EpfReportProps extends StateProps, DispatchProps { }
export const EpfReportComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(epfReport);
