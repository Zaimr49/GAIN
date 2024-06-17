import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/slices/User_Slice';
import { styled } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: '12px 24px', // Adjust padding for larger tabs
  [theme.breakpoints.down('sm')]: {
    padding: '8px 16px', // Adjust padding for smaller screens
  },
}));

const NavbarComp = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClearUserData = () => {
    dispatch(clearUserData());
    navigate("/");
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const listItems = (
    <List>
      <ListItem button onClick={() => navigate("/")}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => navigate("/news")}>
        <ListItemText primary="News" />
      </ListItem>
      <ListItem button onClick={() => navigate("/algorithm-trading")}>
        <ListItemText primary="Algorithm-Trading" />
      </ListItem>
      <ListItem button onClick={() => navigate("/learn-space")}>
        <ListItemText primary="Learn Space" />
      </ListItem>
      {user.email === null ? (
        <>
          <ListItem button onClick={() => navigate("/login")}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => navigate("/signup")}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={handleClearUserData}>
            <ListItemText primary="Logout" />
          </ListItem>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="static" className="bg-body-white shadow">
      <Toolbar>
        {isSmallScreen ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <StyledButton color="inherit" onClick={() => navigate("/")}>
              Home
            </StyledButton>
            <StyledButton color="inherit" onClick={() => navigate("/news")}>
              News
            </StyledButton>
            <StyledButton color="inherit" onClick={() => navigate("/algorithm-trading")}>
              Algorithm-Trading
            </StyledButton>
            <StyledButton color="inherit" onClick={() => navigate("/learn-space")}>
              Learn Space
            </StyledButton>
          </>
        )}
        
        <div style={{ flexGrow: 1 }} /> {/* Spacer to push the buttons to the right */}
        {user.email === null ? (
          <>
            <LoginButton variant="contained" color="primary" onClick={() => navigate("/login")}>
              Login
            </LoginButton>
            <SignupButton variant="contained" color="primary" onClick={() => navigate("/signup")}>
              Sign Up
            </SignupButton>
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

        {/* Drawer for smaller screens */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {listItems}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComp;
