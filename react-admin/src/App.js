import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from './scenes/global/Topbar';
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from './scenes/dashboard';
import ViewAllUsers from './scenes/user/ViewAllUsers';
import Login from './scenes/login';
import AuthState from './context/Auth/AuthState';
import UserState from './context/Users/UserState';
import CreateUser from './scenes/user/CreateUser';
import Toast from './components/Toast';
import { ToastContainer } from 'react-toastify';
import EditUser from './scenes/user/EditUser'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = localStorage.getItem("cmb_token");
    if (checkLogin) {
      setIsLoggedIn(true);
    }
    setIsCheckingLogin(false);
  }, []);

  const handleLogin = () => {
    const checkLogin = localStorage.getItem("cmb_token");
    if (checkLogin) {
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("cmb_token"); // Remove token from localStorage on logout
    navigate("/login"); // Navigate to the login page after logout
  };

  if (isCheckingLogin) {
    return null; // Render nothing while checking login status
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Toast />
        <AuthState>
          <UserState>
            <ToastContainer />
            {/* <Toast /> */}
            {isLoggedIn ? (
              <div className="app">
                <Sidebar isSidebar={isSidebar} />
                <main className="content">
                  <Topbar onLogout={handleLogout} />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/viewAllUsers" element={<ViewAllUsers />} />
                    <Route path="/editUser/:id" element={<EditUser />} />
                    <Route path="/addUser" element={<CreateUser />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </UserState>
        </AuthState>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
