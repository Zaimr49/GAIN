// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setUserData } from '../../redux/slices/User_Slice';
// import { Container, Box, TextField, Button, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch('http://localhost:5001/api/user/login', { // Corrected URL path
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
//       console.log(data);
  
//       if (response.ok) {
//         dispatch(setUserData({ email: data.email, _id: data._id })); // Adjust based on your backend response
//         navigate('/');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('An error occurred during login. Please try again.');
//     }
//   };
  


//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={6} sx={{ padding: 2, marginTop: 4 }}>
//         <Box
//           display="flex"
//           flexDirection="column"
//           alignItems="center"
//         >
//           <Typography component="h1" variant="h5">
//             Login
//           </Typography>
//           <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               autoComplete="current-password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleTogglePasswordVisibility}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Login
//             </Button>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../redux/slices/User_Slice';
import { Container, Box, TextField, Button, Typography, Paper, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setUserData({ email: data.email, _id: data._id }));
        navigate('/');
      } else {
        setAlert({ type: 'error', message: data.message || 'Login failed' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'An error occurred during login. Please try again.' });
      console.error('Error during login:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await fetch('http://localhost:5001/api/user/googleLogin', { // Adjust endpoint as per your backend
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
        setAlert({ type: 'error', message: data.message || 'Google login failed' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Google login failed. Please try again.' });
      console.error('Google login failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="767125768562-6g55mtlo8svcj8642fdh4ujbbfq9mls2.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 2, marginTop: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {alert && <Alert severity="error">{alert.message}</Alert>}
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
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
                autoComplete="current-password"
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
                Login
              </Button>
            </Box>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setAlert({ type: 'error', message: 'Google login failed. Please try again.' })}
            />
          </Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Login;
