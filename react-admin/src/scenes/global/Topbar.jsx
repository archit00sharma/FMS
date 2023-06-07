import { useContext } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AuthContext from '../../context/Auth/AuthContext';
import { Navigate } from 'react-router-dom';






function Topbar({onLogout}) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const { logout } = useContext(AuthContext)
  
  const handleLogout = () => {
    logout()
   onLogout()
  }

  return <Box display="flex" justifyContent="space-between" p={2}>
    <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='3px'>
      <InputBase sx={{ ml: 2, flex: 1 }} placeholder='search'>
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </InputBase>
    </Box>
    <Box display='flex'>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
      </IconButton>
      <IconButton onClick={handleLogout}>
        <LogoutOutlinedIcon />
      </IconButton>
    </Box>
  </Box>
}

export default Topbar