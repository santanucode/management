import { connect } from 'react-redux'
import { RootState, TypedDispatch } from 'redux/store'
import { fetchAllEsiReport } from '../service/esireportslice'
import EsiReport from '../component/esiReport'
import { RoleFunDTO } from 'pages/auth/signin/service/types'
import { getRole } from 'pages/auth/signin/service/userSlice'

interface StateProps {
  loading_getEsiReport: boolean
  success_getEsiReport: boolean
  error_getEsiReport: boolean
  esiReportList: any
  role_function: RoleFunDTO | undefined
}

interface DispatchProps {
  getEsiReport(data: any): void
  getRoleFuncn(): void
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    loading_getEsiReport: state.esireport.loading_getEsiReport,
    success_getEsiReport: state.esireport.success_getEsiReport,
    error_getEsiReport: state.esireport.error_getEsiReport,
    esiReportList: state.esireport.esiReportList,
    role_function: state.userLogin.role_function
  }
}

const mapDispatchToProps = (dispatch: TypedDispatch): DispatchProps => {
  return {
    getEsiReport: (data) => {
      dispatch(fetchAllEsiReport(data))
    },
    getRoleFuncn: () => {
      dispatch(getRole());
    }
  }
}
export interface EsiReportProps extends StateProps, DispatchProps {}
export const EsiReportComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EsiReport)
