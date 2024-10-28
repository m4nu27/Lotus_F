// Importa o pacote express, que é usado para criar o servidor web e gerenciar rotas, middleware e requisições HTTP
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Todas as rotas aqui:
const userRouter = require('./routes/cadastroRouter');
const loginRouter = require('./routes/loginRouter');
const calendarioRouter = require('./routes/calendarioRouter');
app.set('port', process.env.PORT || 3020);
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use('/api', calendarioRouter);
app.use('/api', userRouter);
app.use('/api', loginRouter);

module.exports = app;