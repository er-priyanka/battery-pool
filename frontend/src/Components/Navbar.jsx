import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../Store/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Task Management
        </Typography>
        {token ? (
          <Box>
            <Button color="inherit" component={Link} to="/tasklist">Tasks</Button>
            <Button color="inherit" 
            onClick={handleLogout}
            >Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/signin">Sign In</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
