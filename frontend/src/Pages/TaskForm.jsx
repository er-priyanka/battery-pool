import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Container, Typography, Box, MenuItem, Alert } from '@mui/material';
import { createTask } from '../Store/taskSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    image: ''
  });

  const { title, description, dueDate, status, image } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createTask(formData));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Task
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Description"
            name="description"
            value={description}
            onChange={onChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Due Date"
            type="date"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            select
            fullWidth
            margin="normal"
            variant="outlined"
            label="Status"
            name="status"
            value={status}
            onChange={onChange}
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Image URL"
            name="image"
            value={image}
            onChange={onChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TaskForm;
