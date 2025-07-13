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
}).then(() => console.log("MongoDB connesso"))
  .catch(err => console.error('Error di connessione MongoDB '))

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API per la Gestione dell`Inventario',
      version: '1.0.0',
      description: `API per un Controllo e una Gestione ottimali dello Stock:`},
  },
  apis: ['./src/routers/*.js']
})  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/products', productRoutes)
app.use('/api/reports', reportRoutes)
app.get('/', (req,res) => {
  res.send(`API per la Gestione dell'Inventario`)
})

app.use(errorHandler)

module.exports = app