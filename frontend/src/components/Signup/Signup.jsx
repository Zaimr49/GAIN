import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/slices/User_Slice';
import { Container, Box, TextField, Button, Typography, Paper, IconButton, InputAdornment, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [fullname, setFullname] = useState('');
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateFullName = (fullname) => {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(fullname);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = {};

    if (!validateEmail(email)) {
      valid = false;
      newErrors.email = 'Invalid email address';
    }

    if (!validateFullName(fullname)) {
      valid = false;
      newErrors.fullname = 'Full name must not contain numbers';
    }

    if (age <= 0) {
      valid = false;
      newErrors.age = 'Age must be greater than 0';
    }

    setErrors(newErrors);

    if (!valid) return;

    try {
      const response = await fetch('http://localhost:5001/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, gender, age, name: fullname, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUserData(data.user));

        // Automatically log in the user
        const loginResponse = await fetch('http://localhost:5001/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          dispatch(setUserData(loginData));
          navigate('/');
        } else {
          console.error('Auto login failed:', loginResponse.statusText);
        }
      } else {
        setAlert({ type: 'error', message: data.message });
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Signup failed. Please try again.' });
      console.error('Signup failed:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignup = async (response) => {
    try {
      const res = await fetch('http://localhost:5001/api/user/googleSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch(setUserData(data.user));
        navigate('/');
      } else {
        setAlert({ type: 'error', message: data.message });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Google signup failed. Please try again.' });
    }
  };

  return (
    <GoogleOAuthProvider clientId="767125768562-6g55mtlo8svcj8642fdh4ujbbfq9mls2.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 2, marginTop: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography component="h1" variant="h5">
              Signup
            </Typography>
            {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
            <Box component="form" onSubmit={handleSignup} sx={{ mt: 1 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="fullname"
                autoFocus
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                error={Boolean(errors.fullname)}
                helperText={errors.fullname}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth margin="normal" required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                error={Boolean(errors.age)}
                helperText={errors.age}
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
            <GoogleLogin
              onSuccess={handleGoogleSignup}
              onError={() => setAlert({ type: 'error', message: 'Google login failed. Please try again.' })}
            />
          </Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Signup;
