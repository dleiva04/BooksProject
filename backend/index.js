if(process.env.NODE_ENV == 'development'){
     require('dotenv').config();//para las variables de entorno
}

console.log(process.env.NODE_ENV);

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
require('./database');
//settings 
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));

//para guardar las imagenes (me imagino que se puede cualquier archvio)
const storage = multer.diskStorage({    
     destination: path.join(__dirname,'public/uploads'),
     filename(req,file,cb){
          cb(null, new Date().getTime() + path.extname(file.originalname)); //pone de nombre el time y toma la extension del archivo original
     }
});
app.use(multer({storage}).single('image'));//va a vigilar la subida de imagenes
app.use(express.urlencoded({extended:false})); //para entender lo que viene del frontend en formato json
app.use(express.json());//para entender json
app.use(cors());

//Routes
app.use('/api/books',require('./routes/books'));

//Static files
app.use(express.static(path.join(__dirname,'public')));



//server
app.listen(app.get('port'),()=>{
     console.log(`Server on port ${app.get('port')}`);
});