import React from 'react';
import { Route, Routes } from "react-router-dom";
import Signup from './Signup';
import Signin from './Signin';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Home from './Home';
import PrivateRoute from '../Components/PrivateRoute';

const AllRoutes = () => {
  return (
    <Routes>
      
        <Route path="/signup" Component={Signup} />
        <Route path='/signin' Component={Signin} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        
        <Route path="/taskform" element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route path="/tasklist" element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
         }/>
        
    </Routes>
  )
}

export default AllRoutes;