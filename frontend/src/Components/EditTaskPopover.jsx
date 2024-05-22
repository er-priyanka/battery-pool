import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, MenuItem, Popover, Typography, Alert } from '@mui/material';
import { updateTask } from '../Store/taskSlice';

const EditTaskPopover = ({ task, anchorEl, handleClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.split('T')[0],
    status: task.status,
    image: task.image,
  });

  const { title, description, dueDate, status, image } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(updateTask(formData, task._id));
    handleClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={2} width={300}>
        <Typography variant="h6">Edit Task</Typography>
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
            {loading ? 'Updating...' : 'Update Task'}
          </Button>
        </form>
      </Box>
    </Popover>
  );
};

export default EditTaskPopover;
