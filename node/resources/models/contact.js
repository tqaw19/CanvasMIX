const mongoose = require('mongoose');
const Schema = mongoose.Schema; //funcion permite definir como lucen los daatos

const ContactSchema = new Schema({
    nombre: String,
    apellidos: String,
    correo: String,
    fecha_nac: 'date'
});

module.exports = mongoose.model('contacts',ContactSchema)