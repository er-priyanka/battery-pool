// main file
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.listen(8080, ()=>{
    console.log(`server running on port 8080`);
})