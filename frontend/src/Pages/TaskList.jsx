import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert, IconButton } from '@mui/material';
import { deleteTask, fetchTasks } from '../Store/taskSlice';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTaskPopover from '../Components/EditTaskPopover';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // delete task
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // open popover
  const handleEditClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setCurrentTask(task);
  };

  // popover close
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentTask(null);
  };

  // download list in csv format
  const downloadCSV = () =>{
    const csv = Papa.unparse(tasks, {
      fields: ['title', 'description', 'dueDate', 'status', 'image'],
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // download list in pdf format
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Title', 'Description', 'Due Date', 'Status', 'Image']],
      body: tasks.map(task => [
        task.title,
        task.description,
        task.dueDate.split('T')[0],
        task.status,
        task.image
      ]),
      columnStyles: {4: { columnWidth: 50 } }
     
    });
    doc.save('tasks.pdf');
  };

  

  return (
    <Container sx={{marginBottom: '30px'}} maxWidth="lg">
      <Button sx={{marginTop: '30px'}} variant='contained' color="inherit" component={Link} to="/taskform">Create new Task</Button>

      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tasks
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {
          tasks.length === 0 ? (
            <Typography variant="body1">No tasks found. You have to create your tasks first.</Typography>
          ) 
          : 
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Action</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <img src={task.image} alt={task.title} width="50" />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(event) => handleEditClick(event, task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        }
        {(tasks.length !== 0) && <Box mt={2}>
          <Button onClick={downloadCSV} variant="contained" color="primary">Download CSV</Button>
          <Button onClick={downloadPDF} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>Download PDF</Button>
        </Box>}
      </Box>

      {currentTask && (
        <EditTaskPopover
          task={currentTask}
          anchorEl={anchorEl}
          handleClose={handleClose}
        />
      )}
    </Container>
  );
};

export default TaskList;
