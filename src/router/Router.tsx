import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BanksComponent } from 'pages/app/bank/container/banksContainer'
import { GroupComponent } from 'pages/app/group/container/groupContainer'
import { Home } from 'pages/app/home'
import { OperationCateComponent } from 'pages/app/operationCategory/container/operationCateContainer'
import Pagenotfoundinner from 'pages/app/pagenotfound/component/pagenotfoundinner'
import { RolesComponent } from 'pages/app/role/container/rolesContainer'
import PrivateRoutes from './PrivateRoutes'
import { MaterialComponent } from 'pages/app/material/container/materialContainer'
import { ShiftComponent } from 'pages/app/shift/container/shiftContainer'
import { OperationComponent } from 'pages/app/operation/container/operationContainer'
import { StaffComponent } from 'pages/app/staff/container/staffContainer'
import { EpfComponent } from 'pages/app/epf/container/epfContainer'
import { EsiComponent } from 'pages/app/esi/container/esiContainer'
import { HolidayComponent } from 'pages/app/holiday/container/holidayContainer'
import { WageComponent } from 'pages/app/wage/container/wageContainer'
import { IncentiveComponent } from 'pages/app/incentive/container/incentiveContainer'
import { HolidayConfigComponent } from 'pages/app/holidaysConfig/container/holidayConfigContainer'
import { AttendanceComponent } from 'pages/app/attendance/container/attendanceContainer';
import { BankReportComponent } from 'pages/app/bankStatement/container/bankReportContainer';
import { WorklogComponent } from 'pages/app/worklog/container/worklogContainer'
import { AttendanceReportComponent } from 'pages/app/attendanceReport/container/attendanceReportContainer'
import MustorRole from 'pages/app/mustorRole/component/MusterRole'
import { UsersComponent } from 'pages/app/users/container/userContainer'
import Account from 'pages/app/Account/component/Account'
import { RoleFunctionMapComponent } from 'pages/app/roleFunctionMap/container/roleFunctionMapContainer'
import { AccountComponent } from 'pages/app/Account/container/accountContainer'
import { EpfReportComponent } from 'pages/app/epfReport/container/epfReportContainer'
import { EsiReportComponent } from 'pages/app/esiReport/container/esiReportContainer'
import { WageSlipComponent } from 'pages/app/wageSlip/container/wageslipContainer'
import { MusterRollComponent } from 'pages/app/mustorRole/container/musterrollContainer'
import { HomeComponent } from 'pages/app/home/container/HomeContainer'

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/bank" element={<BanksComponent />} />
        <Route path="/role" element={<RolesComponent />} />
        <Route path="/group" element={<GroupComponent />} />
        <Route path="/material" element={<MaterialComponent />} />
        <Route path="/shift" element={<ShiftComponent />} />
        <Route path="/optioncategory" element={<OperationCateComponent />} />
        <Route path="/operation" element={<OperationComponent />} />
        <Route path="/staff" element={<StaffComponent />} />
        <Route path="/revisepf" element={<EpfComponent />} />
        <Route path="/revisesi" element={<EsiComponent />} />
        <Route path="/holiday" element={<HolidayComponent />} />
        <Route path="/holidayconfig" element={<HolidayConfigComponent />} />
        <Route path="/wage" element={<WageComponent />} />
        <Route path="/incentive" element={<IncentiveComponent />} />
        <Route path="/attendance" element={<AttendanceComponent />} />
        <Route path="/bankstatement" element={<BankReportComponent />} />
        <Route path="/worklog" element={<WorklogComponent />} />
        <Route
          path="/attendancereport"
          element={<AttendanceReportComponent />}
        />
        <Route path="/users" element={<UsersComponent />} />
        <Route path="/rolefunctionmap" element={<RoleFunctionMapComponent />} />
        <Route path="/account" element={<AccountComponent />} />

        <Route path="/" element={<HomeComponent />} />

        <Route path="/epfreport" element={<EpfReportComponent />} />
        <Route path="/esireport" element={<EsiReportComponent />} />
        <Route path="/wageslip" element={<WageSlipComponent />} />
        <Route path="/mustorrole" element={<MusterRollComponent />} />

        <Route path="*" element={<Pagenotfoundinner />} />
        <Route path="/forbidden" element={<h2>No Access...</h2>} />
      </Route>
    </Routes>
  )
}

export default Router
