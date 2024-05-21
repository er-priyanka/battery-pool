// all user routes
const express = require('express');
const { UserController } = require('../Controllers/user.controller');


const userRoute = express.Router();


// signup
userRoute.post('/signup', UserController.signup);

// signin
userRoute.post('/signin', UserController.signin);


module.exports = { userRoute };
