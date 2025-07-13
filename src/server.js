const app = require('./app')

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server in esecuzione sulla porta ${PORT}`)
    console.log(`Swagger: http://localhost:${PORT}/api-docs`)
})