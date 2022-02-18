const mongoose = require('mongoose');
const DB = 'mongodb+srv://ushna:ushna@db1.y82c6.mongodb.net/mern?retryWrites=true&w=majority';


try {
mongoose.connect(DB,() =>
console.log("connected"));      
}catch (error) { 
console.log("could not connect");    
}





  



