// all task routes
const express = require('express');
const { TaskController } = require('../Controllers/task.controller');
const { authenticate } = require('../Middlewares/authenticate');

const taskRoute = express.Router();

// create new task
taskRoute.post('/', authenticate, TaskController.addTask);

// get all the tasks
taskRoute.get('/', authenticate, TaskController.getAllTasks);

// get single task
taskRoute.get('/:id', authenticate, TaskController.getSingleTask);

// update task
taskRoute.patch('/:id', authenticate, TaskController.updateTask);

// delete task
taskRoute.delete('/:id', authenticate, TaskController.deleteTask);


module.exports = { taskRoute };