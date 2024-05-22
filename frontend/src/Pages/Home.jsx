import { Button, Container } from '@mui/material';
import React from 'react'
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <Container  maxWidth="lg">
        <TaskList />
        
    </Container>
  )
}

export default Home;