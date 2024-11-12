const mongoose = require('mongoose')

const bookShema = new mongoose.Schema({
    titulo: String, // va en mayúscula
    autor:  String,
    genero: String,
    fechaPublica: String,    // Lleva com en el ultimo dato
})
module.exports=mongoose.model('libro',bookShema)
