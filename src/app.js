const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const productRoutes = require('./routers/productRoutes')
const reportRoutes = require('./routers/reportRoutes')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')


dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro MongoDB", err))


const swaggerspec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Controlde de Estoque',
      version: '1.0.0',
      description: 'APi para um melhor controle e gerenciamento de Estoque'}
  },
  apis: ['./src/routers/*.js']
})
app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerspec))


app.use('/api/products', productRoutes) 
app.use('/api/reports', reportRoutes) 

app.use(errorHandler)

module.exports = app