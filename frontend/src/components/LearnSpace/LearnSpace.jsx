import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';

function LearnSpace() {
  const user = useSelector((state) => state.User);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      alert('Please Login or Create an Account.');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Container>
      {user.email && (
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.email}!
          </Typography>
          <Typography variant="h5">LearnSpace</Typography>
        </Box>
      )}
    </Container>
  );
}

export default LearnSpace;
