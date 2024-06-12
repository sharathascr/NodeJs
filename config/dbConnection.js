const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection= async()=>{
    try{
       const connect= await mongoose.connect(process.env.MONGOOSE_CONNECTION);
        console.log('Database Connected: ',connect.connection.host, connect.connection.name);
    }
    catch(err){
        console.log(err);   
        process.exit(1);
    }
}

module.exports=dbConnection;
