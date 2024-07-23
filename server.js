const express = require('express');
const app = express();
const db = require('./db.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
 
app.use(cors());
const blogRoute = require('./routes/blogRoute');
app.use('/blogs',blogRoute);
const personRoute = require('./routes/personRoute');
app.use('/person',personRoute)

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] ${req.originalUrl}`);
    next();
}

app.listen(port, () => console.log(`App listening on port ${port}!`))