import React from "react";
import { Box, IconButton, Switch, Tooltip } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { Delete } from "@mui/icons-material";
import { Edit2, Eye } from "iconsax-react";
import "./dataTable.scss";
import { ACTION_LABEL, NO_RESULTS_TEXT, ROWS_PER_TEXT } from "./tableString";
import { TABLEPROPS } from "./types";

const DataTable = (props: any) => {
  const {
    data,
    handleEditAction,
    handleChangeStatus,
    handleDeleteAction,
    column,
    isStatus,
    isDelete,
    isUpdate,
    viewData,
    handleViewAction
  } = props;

  const handleChangeEdit = (row: any) => {
    handleEditAction(row.original);
  };

  const handleStatusChange = (row: any) => {
    handleChangeStatus(row.original);
  };

  const handleChangeDelete = (row: any) => {
    handleDeleteAction(row.original);
  };

  const handleViewData = (row: any) => {
    handleViewAction(row.original);
  };
  return (
    <div>
      <MaterialReactTable
        localization={{
          actions: ACTION_LABEL,
          noResultsFound: NO_RESULTS_TEXT,
          noRecordsToDisplay: NO_RESULTS_TEXT,
          rowsPerPage: ROWS_PER_TEXT,
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "4px",
            border: "1px solid #f7f8f9",
            overflow: "Hidden",
          },
        }}
        positionActionsColumn={"last"}
        positionToolbarDropZone={"none"}
        columns={column}
        data={data}
        enableColumnOrdering={false}
        enableEditing
        enableHiding={false}
        enableDensityToggle={false}
        initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
        renderRowActions={({ row }: any) => (
          <Box className="d-flex">
            {isUpdate === true ? (
              <Tooltip
                key={row.original.id}
                arrow
                placement="right"
                title="Edit"
              >
                <IconButton onClick={() => handleChangeEdit(row)}>
                  <Edit2 size="22" color="#565e64" variant="Outline" />
                </IconButton>
              </Tooltip>
            ) : null}
            {isDelete === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Delete"
              >
                <IconButton
                  color="error"
                  onClick={() => handleChangeDelete(row)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            ) : null}

            {isStatus === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="Status"
              >
                <Switch
                  checked={row.original.is_active === 1 ? true : false}
                  onChange={() => handleStatusChange(row)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Tooltip>
            ) : null}

        {viewData === true ? (
              <Tooltip
                key={Math.random()}
                arrow
                placement="right"
                title="View"
              >
                <IconButton
                  color="error"
                  onClick={() => handleViewData(row)}
                >
                  <Eye
                    size="28"
                    color="#565e64"
                    variant="Bulk"
                    />
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        )}
      />
    </div>
  );
};

export default DataTable;
