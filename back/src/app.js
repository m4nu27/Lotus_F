// Importa o pacote express, que é usado para criar o servidor web e gerenciar rotas, middleware e requisições HTTP
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

// Todas as rotas aqui:
const userRouter = require('./routes/cadastroRouter');
const loginRouter = require('./routes/loginRouter');
const calendarioRouter = require('./routes/calendarioRouter');
const forumRouter = require('./routes/forumRouter'); // Importa o arquivo de rotas do fórum
const perfilRouter = require('./routes/perfilRouter');
app.set('port', process.env.PORT || 3020);



app.use('/api', calendarioRouter);
app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api', forumRouter);
app.use('/api', perfilRouter);


module.exports = app;