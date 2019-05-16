const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');




//coneccion bd , ruta :  /api/courses
mongoose.connect('mongodb://localhost/pc2').then(db => console.log("DB Connected")).catch(err => console.log(err));

//imports
const indexRoutes = require('./routes/index');

//config
app.set('port' , process.env.PORT || 3000);
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine' , 'ejs');
app.use(busboy());
app.use(busboyBodyParser());

//middlewars - antes de rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//rutas

app.use('/', indexRoutes);


//inicia el sv
app.listen(app.get('port'), () => {
    console.log(`Server en puerto ${app.get('port')}`);
})