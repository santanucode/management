import React, { useState } from "react";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";
import MainLayout from "../../../components/common/layout/mainLayout";
import { SearchTable } from "../../../components/table/search-table";
import { CustomModal as Modal } from "../../../components/common/modal/modal";
import RoleForm from "../../../components/form/roleForm/roleForm";
import { Button, Stack, Typography } from "@mui/material";
import { Add } from "iconsax-react";

interface SUBMITDT {
  name: string;
  desc?: string;
  id?: number;
}

const paths = [
  {
    name: "Home",
    path: "",
  },
  {
    name: "Role",
  },
];

const fakeData = [
  {
    id: 1,
    name: "Admin",
    desc: "Access All",
    is_active: 1,
  },
  {
    id: 2,
    name: "Staff Management",
    desc: "Access Staff Only",
    is_active: 0,
  },
  {
    id: 3,
    name: "Operation Management Role",
    desc: "Access Operations Only",
    is_active: 0,
  },
];

const mapableData = [
  {
    dataKey: "name",
    title: "Name",
  },
  {
    dataKey: "desc",
    title: "Description",
  },
  {
    dataKey: "is_active",
    title: "Status",
    isStatus: true,
  },
  {
    dataKey: "id",
    title: "Action",
    isAction: true,
  },
];

const UserRole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [currentType, setCurrentType] = useState<SUBMITDT>();
  const [rows, setRows] = useState(fakeData);

  const openAddModal = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleSelectBtn = (btn: React.SetStateAction<string>) => {
    setClickedBtn(btn);
  };

  const handleChangeEdit = (id: number) => {
    const filterData = fakeData.find((ele: any) => ele.id === id);
    setIsOpen(true);
    setCurrentType(filterData);
    setClickedBtn("edit");
  };

  const handleAddRole = (value: SUBMITDT) => {};

  const handleUpdateRole = (value: SUBMITDT) => {};

  const handleChangeStatus = (id: number, status: number) => {
    const result = rows.map((el) =>
      el.id === id
        ? Object.assign({}, el, { is_active: status === 1 ? 0 : 1 })
        : el
    );
    setRows(result);
  };

  const selectModal = () => {
    return (
      <RoleForm
        handleFormData={clickedBtn === "add" ? handleAddRole : handleUpdateRole}
        onHandleClose={handleModalClose}
        clickedBtn={clickedBtn}
        initialValue={clickedBtn === "edit" ? currentType : {}}
      />
    );
  };

  return (
    <MainLayout>
      <Breadcrumb pathList={paths} />
      <Modal isOpen={isOpen}>{selectModal()}</Modal>

      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <div>
          <Typography variant="h6">Role</Typography>
        </div>
        <div>
          <Stack spacing={2} direction="row">
            <Button
              sx={{ borderRadius: "10px" }}
              size="medium"
              variant="contained"
              startIcon={<Add size="22" color="#FFFFFF" />}
              onClick={() => {
                openAddModal();
                handleSelectBtn("add");
              }}
            >
              Add New Role
            </Button>
          </Stack>
        </div>
      </div>

      <div>
        {rows.length > 0 ? (
          <SearchTable
            tableHead={"Role Table"}
            placeholder={"Search Role"}
            data={rows}
            mapableData={mapableData}
            searchProp={["name", "desc"]}
            isStatus={true}
            isUpdate={true}
            handleChangeEdit={handleChangeEdit}
            handleChangeActiveStatus={handleChangeStatus}
          />
        ) : null}
      </div>
    </MainLayout>
  );
};

export default UserRole;
