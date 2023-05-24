import React, { useEffect, useMemo, useState } from "react";
import { CustomModal as Modal } from "components/common/modal/modal";
import { Stack, Typography } from "@mui/material";
import Breadcrumb from "components/common/Breadcrumb/Breadcrumb";
import { MRT_ColumnDef } from "material-react-table";
import StatusChip from "components/common/chip/chip";
import {
  ADDBTNLABEL,
  CODELABEL,
  CURRENTPATH,
  EFFECTDATE,
  HOMEPATH,
  MATERIALHEADER,
  NAMELABEL,
  RATELABEL,
  STATUSLABEL,
  SUCESSCREATETITLE,
  SUCESSCREATEXT,
  SUCESSSTATUSTEXT,
  SUCESSSTATUSTITLE,
  SUCESSUPDATETITLE,
  SUCESSUPDATEXT,
} from "../container/materialString";
import DataTable from "components/table/dataTable/dataTable";
import CommonMainButton from "components/common/Button/commonButton";
import MaterialForm from "components/form/materialForm/materialForm";
import { CREATEMATERIALDT, MATERIALTBLDT } from "../service/types";
import Swal from "sweetalert2";
import Loader from "components/common/Loader/Loader";
import { MaterialProps } from "../container/materialContainer";

interface SUBMITDT {
  code?: string;
  name?: string;
  BCNHL_bonus?: number;
  id?: number;
  is_active?: number;
  effective_from?: string;
}

const paths = [
  {
    name: HOMEPATH,
    path: "",
  },
  {
    name: CURRENTPATH,
  },
];

const MasterMaterial = (props: MaterialProps) => {
  const {
    loading_getMaterial,
    loading_createMaterial,
    loading_updateMaterial,
    error_createMaterial,
    success_createMaterial,
    error_updateMaterial,
    success_updateMaterial,
    materialList,
    getAllMaterials,
    createMaterial,
    updateMaterial,
    statusChangeMaterial,
    success_statusMaterial,
    loading_statusMaterial,
    role_function,
    getRoleFuncn

  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<SUBMITDT>();
  const [rows, setRows] = useState(materialList);
  const [isLoader, setLoader] = useState<boolean | string>(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  useEffect(() => {
    getAllMaterials();
  }, []);


  useEffect(() => {
    getRoleFuncn()
  }, [])

  useEffect(() => {
    setRows(materialList);
  }, [loading_getMaterial]);

  useEffect(() => {
    const isLoading =
      loading_getMaterial ||
      loading_updateMaterial ||
      loading_createMaterial ||
      loading_statusMaterial;
    setLoader(isLoading);
  }, [
    loading_getMaterial,
    loading_updateMaterial,
    loading_createMaterial,
    loading_statusMaterial,
  ]);

  const columns = useMemo<MRT_ColumnDef<SUBMITDT>[]>(
    () => [
      {
        accessorKey: "code",
        header: CODELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "name",
        header: NAMELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "BCNHL_bonus",
        header: RATELABEL,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "effective_from",
        header: EFFECTDATE,
        enableColumnOrdering: false,
      },
      {
        accessorKey: "status",
        header: STATUSLABEL,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableColumnFilter: false,
        Cell: ({ cell }) => <StatusChip value={cell.getValue<any>()} />,
      },
    ],
    []
  );

  useEffect(() => {
    if (success_createMaterial) {
      getAllMaterials();
      setErrorMessage("");
      setIsOpen(false);
      Swal.fire({
        title: SUCESSCREATETITLE,
        text: SUCESSCREATEXT,
        icon: "success",
      });
    } else if (error_createMaterial) {
      setErrorMessage(error_createMaterial);
    } else if (error_updateMaterial) {
      setErrorMessage(error_updateMaterial);
    } else if (success_updateMaterial) {
      getAllMaterials();
      setErrorMessage("");
      setIsOpen(false);
      Swal.fire({
        title: SUCESSUPDATETITLE,
        text: SUCESSUPDATEXT,
        icon: "success",
      });
    } else if (success_statusMaterial) {
      getAllMaterials();
      setErrorMessage("");
      setIsOpen(false);
      Swal.fire({
        title: SUCESSSTATUSTITLE,
        text: SUCESSSTATUSTEXT,
        icon: "success",
      });
    }
  }, [
    success_createMaterial,
    success_statusMaterial,
    error_createMaterial,
    error_updateMaterial,
    success_updateMaterial,
  ]);

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setErrorMessage("");
    setIsOpen(false);
  };
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn);
  };

  const handleChangeEdit = (data: MATERIALTBLDT) => {
    setCurrentType(data);
    handleSelectBtn("edit");
    openAddModal();
  };

  const handleAddMaterial = (value: CREATEMATERIALDT) => {
    createMaterial(value);
  };

  const handleUpdateMaterial = (value: SUBMITDT) => {
    console.log(value, "value:::");
    const materialData = {
      name: value.name,
      BCNHL_bonus: value.BCNHL_bonus,
      code: value.code,
      effective_from: value.effective_from,
      is_active: currentType?.is_active === 1 ? true : false,
    };
    const data:any = {
      id: currentType?.id,
      material: materialData,
    };
    updateMaterial(data);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },

    buttonsStyling: false,
  });
  const handleStatusChange = (data: any) => {
    let fetchData = {
      name: data.name,
      code: data.code,
      BCNHL_bonus: data.BCNHL_bonus,
      is_active: data.is_active === 1 ? false : true,
    };
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleActionStatus(data);
        }
      });
  };

  const handleActionStatus = (values: any) => {
    const matrialData = JSON.parse(JSON.stringify(values));
    if (matrialData?.is_active === 1) {
      matrialData.is_active = false;
    } else {
      matrialData.is_active = true;
    }
    const result = {
      name: matrialData.name,
      code: matrialData.code,
      BCNHL_bonus: matrialData.BCNHL_bonus,
      effective_from: matrialData.effective_from,
      is_active: matrialData.is_active,
    };
    const data = {
      id: matrialData?.id,
      material: result,
    };
    statusChangeMaterial(data);
  };

  const selectModal = () => {
    return (
      <MaterialForm
        handleFormData={
          clickedBtn === "add" ? handleAddMaterial : handleUpdateMaterial
        }
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    );
  };

  return (
    <>
      {isLoader && <Loader />}
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen}>{selectModal()}</Modal>
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">{MATERIALHEADER}</Typography>
        </div>
        {role_function?.Material.Create_New_Material && <div>
          <Stack spacing={2} direction="row">
            <CommonMainButton
              label={ADDBTNLABEL}
              onAddclick={() => {
                openAddModal();
                handleSelectBtn("add");
              }}
            />
          </Stack>
        </div>}
      </div>

      <div>
        <DataTable
          data={rows}
          handleEditAction={handleChangeEdit}
          handleChangeStatus={handleStatusChange}
          column={columns}
          isUpdate={role_function?.Material.Update_Material_Detail && true}
          isStatus={role_function?.Material.Update_Material_Detail && true}
        />
      </div>
    </>
  );
};

export default MasterMaterial;
