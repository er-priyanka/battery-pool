import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { signInUser } from '../Store/userSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(signInUser(formData));
  };

  if(token){
    navigate('/');
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signin;
