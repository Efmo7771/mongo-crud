const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {config} = require('dotenv') 
config()

const rutasLibro = require('./routes/bookroutes')

const app= express()
app.use(bodyParser.json()) // app.use(express.json()) [se usa ahora ]

// Coneccion de base de datos
mongoose.connect( process.env.MONGO_URL,{ dbName: process.env.MONGO_DB_NAME} )
const db  = mongoose.connection
app.use('/libros', rutasLibro)


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Servidor iniciado en el puerto nro: ${port}`)
})
