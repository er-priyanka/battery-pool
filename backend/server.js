// main file
const express = require('express');
require("dotenv").config();
const { connection } = require("./Config/db");
const cors = require('cors');


const PORT = process.env.PORT;

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());




app.get('/', (req, res) => res.send('Hello'));

app.listen(PORT, async () => {
    try{
        await connection;
        console.log("Connected to db");
    }catch(err){
        console.log(err);
    }
    console.log(`server started on http://localhost:${PORT}`)

});