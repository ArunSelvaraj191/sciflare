import { useLocation, useNavigate } from "react-router-dom";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, MenuItem, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { states } from "./makeData";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  // For API Header

  const headers = {
    Authorization: "Bearer sciflare",
    "Content-Type": "application/json",
  };

  const baseURL = "http://localhost:5000/api";

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      axios
        .put(`${baseURL}/update`, values, { headers })
        .then((response) => {
          if (response.status === 200) {
            toast(`User Updated Successfully`, {
              type: "success",
            });
          } else {
            toast("Something went wrong.!", {
              type: "warning",
            });
          }
        })
        .catch((error) => {
          toast(error, { type: "error" });
        });
      tableData[row.index] = values;
      setTableData([...tableData]);
      exitEditingMode();
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !confirm(`Are you sure you want to delete ${row.getValue("username")}`)
      ) {
        return;
      }
      const apiUrl = `${baseURL}/delete/${row?.original?._id}`;
      axios
        .delete(apiUrl, { headers })
        .then((response) => {
          toast(`User Deleted Successfully`, {
            type: "success",
          });
        })
        .catch((error) => {
          console.error(
            "Error deleting:",
            error.response ? error.response.data : error.message
          );
        });
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "role",
        header: "Role ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
      },
      {
        accessorKey: "username",
        header: "User Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "phone_number",
        header: "Phone Number",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "age",
        header: "Age",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "state",
        header: "State",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
    ],
    [getCommonEditTextFieldProps]
  );

  const logOut = useCallback(() => {
    localStorage.removeItem("user_data");
    navigate("/");
  }, []);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("user_data"));
    if (savedData?._id) {
      const { role, _id } = location?.state;
      const apiUrl = `${baseURL}/dashboard?role=${role}&&userId=${_id}`;
      axios
        .get(apiUrl, { headers })
        .then((response: any) => {
          setTableData(response.data);
        })
        .catch((error: Error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box>
            <Button
              onClick={() => navigate("/signup")}
              variant="contained"
              sx={{ mr: 1 }}
            >
              Create New Account
            </Button>
            <Button onClick={logOut} variant="contained">
              Logout
            </Button>
          </Box>
        )}
      />
    </>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default Dashboard;
