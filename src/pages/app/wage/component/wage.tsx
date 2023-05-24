import React, { useEffect, useMemo, useState } from 'react';
import { CustomModal as Modal } from 'components/common/modal/modal';
import { Stack, Typography } from '@mui/material';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import {
  MRT_ColumnDef
} from 'material-react-table';
import { useDispatch } from 'react-redux';
import { ADDNEWWAGE, CURRENTPATH, EFFECTDATELABEL, HOMEPATH, TBLHEAD, BASICAMOUNTLABEL, DAPERCENTAGELABEL, CANPERCENTAGELABEL, HRAPERCENTAGELABEL, STATUSLABEL, STATUSCHANGEHEAD, STATUSCHANGESUBHEAD, STATUSCHANGEPERMISSIONYES, STATUSCHANGEPERMISSIONNO, STATUSCHANGEDELETED, STATUSDELETEDSUCCESS, UPCOMINGREVISE } from '../container/wageString';
import DataTable from 'components/table/dataTable/dataTable';
import CommonMainButton from 'components/common/Button/commonButton';
import WageForm from 'components/form/wageForm/wageForm';
import StatusChip from 'components/common/chip/chip';
import Swal from 'sweetalert2';
import Loader from 'components/common/Loader/Loader';
import { WageProps } from '../container/wageContainer';
import { CREATEDT, MAINROWDTO, TBLDT } from '../service/types';
import { reset } from '../service/wageSlice';
import EffectiveTable from 'components/table/effectiveTable/effectiveTable';
import _ from 'lodash';
import moment from 'moment';

interface SUBMITDT {
  id?: number,
  basic_amount?: number,
  dearness_allowance_percentage?: number,
  dearness_allowance_amount?: number,
  houserent_allowance_percentage?: number,
  houserent_allowance_amount?: number,
  canteen_allowance_percentage?: number,
  canteen_allowance_amount?: number,
  effective_from?: string,
  is_active?: boolean | number
}
const paths = [
  {
    name: HOMEPATH,
    path: '',
  },
  {
    name: CURRENTPATH
  },
]
const BasicWage = (props: WageProps) => {
  const {
    getAllWage,
    createWage,
    updateWage,
    updateStatusWage,
    loading_getWage,
    loading_createWage,
    success_createWage,
    error_createWage,
    loading_updateWage,
    success_updateWage,
    error_updateWage,
    loading_statusWage,
    success_statusWage,
    wageList,
    role_function,
    getRoleFuncn
  } = props;

  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<SUBMITDT>()
  const [rows, setRows] = useState<MAINROWDTO>();
  const [errorMessage, setErrorMessage] = useState<boolean | string | undefined>();
  const [isLoader, setLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllWage();
  }, []);

  useEffect(() => {
    getRoleFuncn()
  }, [])
  
  console.log("role_function", role_function)
  
  function sort_And_Return_1st_n_last_value(arr: any, key: string) {
    const sortVal = _.sortBy(arr, ((ele) => moment(moment(ele[key]).format('YYYYMMDD'))));

    let output = _.groupBy(sortVal, function (n) {
      return n.effective_from <= moment().format() ? 'current_date' : 'upcoming_date';
      });
    return output
  }

  useEffect(() => {
    // setRows(wageList)
    const final:any = sort_And_Return_1st_n_last_value(wageList, "effective_from")
    setRows(final)

  }, [loading_getWage])


  
  console.log("wageList",wageList)
  useEffect(() => {
    if (success_createWage) {
      dispatch(reset())
      setErrorMessage("")
      getAllWage();
      setIsOpen(false);
      Swal.fire({
        title: "Success!",
        text: "Created Successfully",
        icon: "success",
      });
    } else if (error_createWage) {
      setErrorMessage(error_createWage)
    } else if (error_updateWage) {
      setErrorMessage(error_updateWage)
    } else if (success_updateWage) {
      dispatch(reset())
      setIsOpen(false);
      getAllWage();
      setErrorMessage("")
      Swal.fire({
        title: "Success!",
        text: "Updated Successfully",
        icon: "success",
      });
    } else if (success_statusWage) {
      dispatch(reset())
      setIsOpen(false);
      getAllWage();
      setErrorMessage("");
      Swal.fire(
        'Updated!',
        STATUSCHANGEDELETED,
        STATUSDELETEDSUCCESS
      )
    }
  }, [success_createWage, success_updateWage, success_statusWage, error_createWage, error_updateWage])
  useEffect(() => {
    const isLoading = loading_getWage || loading_createWage || loading_updateWage || loading_statusWage;
    setLoader(isLoading);
  }, [loading_getWage, loading_createWage, loading_updateWage, loading_statusWage]);
  
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'basic_amount',

        header: BASICAMOUNTLABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'dearness_allowance_percentage',
        header: DAPERCENTAGELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'houserent_allowance_percentage',
        header: HRAPERCENTAGELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'canteen_allowance_percentage',
        header: CANPERCENTAGELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'effective_from',
        header: EFFECTDATELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: 'is_active',
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => (
          <StatusChip
            value={cell.getValue()}
          />
        ),
      }
    ],
    [],
  );
  const openAddModal = () => {
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setErrorMessage("")
    setIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }
  const handleChangeEdit = (data: SUBMITDT) => {
    setCurrentType(data)
    setClickedBtn('edit')
    setIsOpen(true)
  }
  const handleAddWage = (value: CREATEDT) => {
    createWage(value)
  }
  const handleUpdateWage = (value: TBLDT) => {
    const wageData = value;
    if (wageData?.is_active === 1) {
      wageData.is_active = true
    } else {
      wageData.is_active = false
    }
    const data = {
      id: currentType?.id,
      value: wageData
    }
    updateWage(data)
  }
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  })
  const handleStatusChange = (data: TBLDT) => {
    swalWithBootstrapButtons
      .fire({
        title: STATUSCHANGEHEAD,
        text: STATUSCHANGESUBHEAD,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: STATUSCHANGEPERMISSIONYES,
        cancelButtonText: STATUSCHANGEPERMISSIONNO,
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleActionStatus(data)
        }
      })
  }
  const handleActionStatus = (values: TBLDT) => {
    const wageDetail = JSON.parse(JSON.stringify(values));
    if (wageDetail?.is_active === 1) {
      wageDetail.is_active = false
    } else {
      wageDetail.is_active = true
    }
    const result = {
      basic_amount: wageDetail.basic_amount,
      dearness_allowance_percentage: wageDetail.dearness_allowance_percentage,
      houserent_allowance_percentage: wageDetail.houserent_allowance_percentage,
      canteen_allowance_percentage: wageDetail.canteen_allowance_percentage,
      dearness_allowance_amount: wageDetail.dearness_allowance_amount,
      houserent_allowance_amount: wageDetail.houserent_allowance_amount,
      canteen_allowance_amount: wageDetail.canteen_allowance_amount,
      effective_from: wageDetail.effective_from,
      is_active: wageDetail.is_active
    }
    const wageData = {
      id: wageDetail?.id,
      value: result
    }
    updateStatusWage(wageData)
  }
  const selectModal = () => {
    return (
      <WageForm
        handleFormData={clickedBtn === 'add' ? handleAddWage : handleUpdateWage}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === 'edit' ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    )
  }
  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen}>{selectModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLHEAD}</Typography>
        </div>
        {role_function?.WageComponent.Create_New_Wage_Component && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDNEWWAGE}
              onAddclick={() => {
                openAddModal()
                handleSelectBtn('add')
              }}
            />
          </Stack>
        </div>}
      </div>
      <div>
        <EffectiveTable
          data={rows?.current_date ? rows.current_date : []}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.WageComponent.Update_Wage_Component_Detail && true}
          isStatus={role_function?.WageComponent.Update_Wage_Component_Detail && true}
          options={false}
        />
        <div className='pt-4 pb-3'>
        <Typography variant="h6">{UPCOMINGREVISE}</Typography>
          {/* <h6>Upcoming Revise</h6> */}
        </div>

       <EffectiveTable
          data={rows?.upcoming_date ? rows.upcoming_date : []}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.WageComponent && true}
          isStatus={role_function?.WageComponent && true}
          options={false}
        />

      </div>
    </>
  )
}

export default BasicWage;
