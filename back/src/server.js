// Importa a aplicação Express configurada a partir do arquivo 'app.js'
//const app = require('./app');

// Obtém a porta configurada para o servidor a partir da instância do aplicativo Express
// const port = app.get('port');

// Inicia o servidor Express e faz com que ele comece a escutar as requisições na porta especificada

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3009
require('dotenv').config()
const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0", 
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{url: "http://localhost:3009"}],
    },
    apis: [`${__dirname}/routes/*.js`], //caminho para as rotas
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(express.json())
app.use(cors())
app.listen(port, () => console.log(`Rodando na porta ${port}!`))
