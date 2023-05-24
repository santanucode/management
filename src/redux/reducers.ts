import { combineReducers } from '@reduxjs/toolkit'
import banksSlice from 'pages/app/bank/service/banksSlice'
import operationCateSlice from 'pages/app/operationCategory/service/operationCateSlice'
import roleSlice from 'pages/app/role/service/rolesSlice'
import materialSlice from 'pages/app/material/service/materialSlice'
import shiftSlice from 'pages/app/shift/service/shiftSlice'
import operationSlice from 'pages/app/operation/service/operationSlice'
import staffSlice from 'pages/app/staff/service/staffSlice'
import epfSlice from 'pages/app/epf/service/epfSlice'
import esiSlice from 'pages/app/esi/service/esiSlice'
import holidaySlice from 'pages/app/holiday/service/holidaySlice'
import wageSlice from 'pages/app/wage/service/wageSlice'
import incentiveSlice from 'pages/app/incentive/service/incentiveSlice'
import holidayConfigSlice from 'pages/app/holidaysConfig/service/holidayConfigSlice'
import attendanceSlice from 'pages/app/attendance/service/attendanceSlice'
import bankReportSlice from 'pages/app/bankStatement/service/bankReportSlice'
import worklogSlice from 'pages/app/worklog/service/worklogSlice'
import attendanceReportSlice from 'pages/app/attendanceReport/service/attendanceReportSlice'
import userSlice from 'pages/app/users/service/userSlice'
import  userLoginSlice  from 'pages/auth/signin/service/userSlice'
import roleFunctionMapSlice from 'pages/app/roleFunctionMap/service/roleFunctionMapSlice';
import accountSlice from 'pages/app/Account/service/accountSlice'
import  groupsSlice  from 'pages/app/group/service/groupSlice'
import epfreportslice from 'pages/app/epfReport/service/epfreportslice'
import esireportslice from 'pages/app/esiReport/service/esireportslice'
import wageSlipSlice from 'pages/app/wageSlip/service/wageslipSlice'
import MusterRollSlice from 'pages/app/mustorRole/service/musterrollslice'
import Homeslice from 'pages/app/home/services/Homeslice'


export const rootReducer = combineReducers({
  
  operationCate: operationCateSlice,
  roles: roleSlice,
  banks: banksSlice,
  groups: groupsSlice,
  material: materialSlice,
  shift: shiftSlice,
  operation: operationSlice,
  staff: staffSlice,
  epf: epfSlice,
  esi: esiSlice,
  holiday: holidaySlice,
  holidayConfig: holidayConfigSlice,
  wage: wageSlice,
  musterroll:MusterRollSlice,
  wageslip: wageSlipSlice,
  incentive: incentiveSlice,
  attendance: attendanceSlice,
  banksreports: bankReportSlice,
  worklog: worklogSlice,
  attendancereport: attendanceReportSlice,
  epfreport: epfreportslice,
  esireport:esireportslice,
  users: userSlice,
  userLogin: userLoginSlice,
  rolefunctionmap: roleFunctionMapSlice,
  accountdetails: accountSlice,
  home: Homeslice
  
})
