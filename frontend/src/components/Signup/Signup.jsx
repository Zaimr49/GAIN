import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/slices/User_Slice';
import { Container, Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Dummy signup logic
    dispatch(setUserData({ isAdmin, email, _id: '1' }));
    navigate('/');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 2, marginTop: 4 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
