import { connect } from 'react-redux';
import { RootState, TypedDispatch } from '../../../../redux/store';
import BankReport from '../component/bankReport';
import { fetchBankReports, fetchAllBanks } from '../service/bankReportSlice';
import { GETBANKDT } from 'pages/app/bank/service/types';
import { getRole } from 'pages/auth/signin/service/userSlice';
import { RoleFunDTO } from 'pages/auth/signin/service/types';

interface StateProps {
    error_getBank: string | boolean | undefined;
    loading_getBank: boolean;
    success_getBank: boolean;
    error_getBankReport: string | boolean | undefined;
    loading_getBankReport: boolean;
    success_getBankReport: boolean;
    banksList: GETBANKDT | null;
    role_function: RoleFunDTO | undefined
    bankReportList?: any;
    
}

interface DispatchProps {
    getAllBanks(): void;
    getAllBankReport(body: any): void;
    getRoleFuncn(): void
}

const mapStateToProps = (state: any): StateProps => {
    return {
        error_getBank: state.banks.error_getBank,
        loading_getBank: state.banks.loading_getBank,
        success_getBank: state.banks.success_getBank,   
        banksList: state.banks.banksList,
        error_getBankReport: state.banksreports.error_getBankReport,
        loading_getBankReport: state.banksreports.loading_getBankReport,
        success_getBankReport: state.banksreports.success_getBankReport,

        bankReportList: state.banksreports.bankReportList,
        role_function: state.userLogin.role_function
    };
};

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
    return {
        getAllBanks: () => {
            dispatch(fetchAllBanks());
        },
        getAllBankReport: (data) => {
            dispatch(fetchBankReports(data));
        },
        getRoleFuncn: () => {
            dispatch(getRole());
          }
    };
};

export interface BankReportProps extends StateProps, DispatchProps { }
export const BankReportComponent = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BankReport);