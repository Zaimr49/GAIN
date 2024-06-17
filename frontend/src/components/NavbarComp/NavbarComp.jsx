import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/slices/User_Slice';
import { styled } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: 'darkGray', // Customize the color
  '&:hover': {
    backgroundColor: 'darkerGray', // Customize the hover color
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: 'darkGray', // Customize the color
  '&:hover': {
    backgroundColor: 'darkerGray', // Customize the hover color
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: '#f44336', // Customize the color
  '&:hover': {
    backgroundColor: '#d32f2f', // Customize the hover color
  },
}));

function NavbarComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);

  const handleClearUserData = () => {
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <AppBar position="static" className="bg-body-white shadow">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
        <Button color="inherit" onClick={() => navigate("/news")}>News</Button>
        <Button color="inherit" onClick={() => navigate("/algorithm-trading")}>Algorithm-Trading</Button>
        <Button color="inherit" onClick={() => navigate("/learn-space")}>Learn Space</Button>
        
        <div style={{ flexGrow: 1 }} /> {/* Spacer to push the buttons to the right */}
        {user.email === null ? (
          <>
            <LoginButton variant="contained" color="primary" onClick={() => navigate("/login")}>Login</LoginButton>
            <SignupButton variant="contained" color="primary" onClick={() => navigate("/signup")}>Sign Up</SignupButton>
          </>
        ) : (
          <>
            <LogoutButton variant="contained" color="primary" onClick={handleClearUserData}>
              <ExitToAppIcon />
              Logout
            </LogoutButton>
            <Button variant='contained' color="primary" onClick={() => navigate("/dashboard")}>
              <PersonIcon />
              Dashboard
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavbarComp;
