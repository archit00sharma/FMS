import { useState,useContext } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Groups2Icon from '@mui/icons-material/Groups2';
import AuthContext from "../../context/Auth/AuthContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [showTeamMenu, setShowTeamMenu] = useState(false);


  const handleTeamMenuToggle = () => {
    setShowTeamMenu(!showTeamMenu);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                {localStorage.getItem("role") ? localStorage.getItem("role").toUpperCase(): ''}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Manage Team */}
            <Item
              title="Manage Team"
              to="/viewAllUsers"
              icon={<Groups2Icon />}
              selected={selected}
              setSelected={setSelected}
              // Add the showTeamMenu state to control the visibility
              // of the team menu
              showMenu={showTeamMenu}
              handleMenuToggle={handleTeamMenuToggle}
            />

            <Item
              title="Manage Cases"
              to="/cases"
              icon={<CloudUploadIcon />}
              selected={selected}
              setSelected={setSelected}
              // Add the showTeamMenu state to control the visibility
              // of the team menu
              showMenu={showTeamMenu}
              handleMenuToggle={handleTeamMenuToggle}
            />


            <Item
              title="Manage Area"
              to="/area"
              icon={<LocationOnIcon />}
              selected={selected}
              setSelected={setSelected}
              // Add the showTeamMenu state to control the visibility
              // of the team menu
              showMenu={showTeamMenu}
              handleMenuToggle={handleTeamMenuToggle}
            />


            <Item
              title="Manage Product"
              to="/product"
              icon={<ProductionQuantityLimitsIcon />}
              selected={selected}
              setSelected={setSelected}
              // Add the showTeamMenu state to control the visibility
              // of the team menu
              showMenu={showTeamMenu}
              handleMenuToggle={handleTeamMenuToggle}
            />


            <Item
              title="Manage Bank"
              to="/bank"
              icon={<AccountBalanceIcon />}
              selected={selected}
              setSelected={setSelected}
              // Add the showTeamMenu state to control the visibility
              // of the team menu
              showMenu={showTeamMenu}
              handleMenuToggle={handleTeamMenuToggle}
            />


            {/* <SubMenu
              title="Manage Cases"
              icon={<ContactsOutlinedIcon />}
              defaultOpen={!isCollapsed && selected === "Manage Cases"}
            >
              <Item
                title="Subitem 1"
                to="/cases/subitem1"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Subitem 2"
                to="/cases/subitem2"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu> */}


          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};


export default Sidebar;
