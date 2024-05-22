import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { signUpUser } from '../Store/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile: ''
  });

  const { name, email, password, profile } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(signUpUser(formData));
  };

  if(success){
    navigate("/signin");
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
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
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Profile"
            name="profile"
            value={profile}
            onChange={onChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
