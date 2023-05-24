import React, { useMemo, useState } from 'react';
import { CustomModal as Modal } from 'components/common/modal/modal';
import { Stack, Typography } from '@mui/material';
import Breadcrumb from 'components/common/Breadcrumb/Breadcrumb';
import {
  MRT_ColumnDef
} from 'material-react-table';
import { ADDNEWWAGE, CURRENTPATH, EFFECTDATELABEL, HOMEPATH, TBLHEAD, BASICAMOUNTLABEL } from '../container/daWageString';
import DataTable from 'components/table/dataTable/dataTable';
import CommonMainButton from 'components/common/Button/commonButton';
import DaWageForm from 'components/form/daWageForm/daWageForm';

interface SUBMITDT {
  id: number,
  basicPercentage: number
  effectDate: string
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

const fakeData = [
  {
    id: 1,
    basicPercentage: 13.25,
    effectDate: "2023-01-01"
  },
  {
    id: 2,
    basicPercentage: 21.35,
    effectDate: "2023-01-01"
  },
]

const DaWage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [clickedBtn, setClickedBtn] = useState('')
  const [currentType, setCurrentType] = useState<SUBMITDT>()
  const [rows, setRows] = useState(fakeData);

  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: 'basicPercentage',
        header: BASICAMOUNTLABEL,
        enableColumnOrdering: false,
      },

      {
        accessorKey: 'effectDate',
        header: EFFECTDATELABEL,
        enableColumnOrdering: false,
      },
    ],
    [],
  );



  const openAddModal = () => {
    setIsOpen(true)
  }
  const handleModalClose = () => {
    setIsOpen(false)
  }
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn)
  }

  const handleChangeEdit = (data: SUBMITDT) => {
    const filterData = fakeData.find((ele: any) => ele.id === data.id)
    setIsOpen(true)
    setCurrentType(filterData)
    setClickedBtn('edit')
  }

  const handleAddDaWage = (value: SUBMITDT) => {
  }

  const handleUpdateDawage = (value: SUBMITDT) => {
  }

  const handleChangeDelete = () => {
    alert(">>>>>")
  }

  const selectModal = () => {
    return (
      <DaWageForm
        handleFormData={clickedBtn === 'add' ? handleAddDaWage : handleUpdateDawage}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === 'edit' ? currentType : {}}
      />
    )
  }

  return (
    <>
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen}>{selectModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{TBLHEAD}</Typography>
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDNEWWAGE}
              onAddclick={() => {
                openAddModal()
                handleSelectBtn('add')
              }}
            />
          </Stack>
        </div>
      </div>

      <div>
        <DataTable
          data={rows}
          handleEditAction={handleChangeEdit}
          handleDeleteAction={handleChangeDelete}
          column={columns}
          isUpdate={true}
          isDelete={true}
        />
      </div>
    </>
  )
}

export default DaWage;
