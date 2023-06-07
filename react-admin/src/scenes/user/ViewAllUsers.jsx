import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, Button, colors, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import UserContext from "../../context/Users/UserContext";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { teal, red, greenAccent } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const ViewAllUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const context = useContext(UserContext);
  const { getAllUsers, deleteUserById, users } = context;
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getRowId = (row) => row._id.$oid;

  const rows = users.map((user, index) => ({
    ...user,
    sno: index + 1,
  }));

  const handleViewEditClick = (row) => {
    const id = getRowId(row);
    navigate(`/editUser/${id}`);
  };

  const handleDeleteClick = (row) => {
    const id = getRowId(row);
    deleteUserById(id)
  };

  const handleCreateUser = () => {
    console.log("Create User clicked");
    navigate("/addUser");

  };

  const columns = [
    { field: "sno", headerName: "Sno", flex: 0 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      type: "string",
      headerAlign: "left",
      align: "left",
      cellClassName: "role-column--cell",
    },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <IconButton
            sx={{
              p: 0.5,
              m: 0.5,
              backgroundColor: teal[500],
              "&:hover": {
                backgroundColor: teal[700],
              },
            }}
            size="small"
            onClick={() => handleViewEditClick(row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              p: 0.5,
              m: 0.5,
              backgroundColor: red[500],
              "&:hover": {
                backgroundColor: red[700],
              },
            }}
            size="small"
            onClick={() => handleDeleteClick(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Team" subtitle="Managing the Team Members" />
      <Box
        display="flex"
        justifyContent="flex-end"
        mb="20px"
      >
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: colors.greenAccent[700] }} // Set the background color to green accent
          onClick={handleCreateUser}
        >
          Create User
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default ViewAllUsers;
