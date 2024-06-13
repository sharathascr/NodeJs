const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const dbConnection=require('./config/dbConnection');
require('dotenv').config();

dbConnection();
const app=express();
app.use(express.json());

app.use("/api/contacts", require('./Routes/ContactRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));


app.use(errorHandler);

app.listen(process.env.PORT || 5001, ()=>console.log('Server is listening on 5001...'));