const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
app.use(express.json());
require('./db/conn');
app.use(require('./router/auth'));
// const User = require('./models/userSchema');


const PORT = process.env.PORT;

// // middleware
 const middleware = (req,res, next) => {

    console.log(`middleware`)

next();
}


app.listen(3000,()=>{
    console.log(`server is running on port ${PORT}`)
})
