// // Módulo de configuraçãi e aplicação da webapi

// // Importar o pacote express (servidor)
// const express = require('express');

// // Importar o pacote doteenv, gerenciador de variáveis de ambiente
// const doteenv = require('doteenv').config();

// // Instanciar o express na variaável app
// const app = express();

// // Setar a porta do servidor, a partir do arquivo .env ou assumir 3005
// app.set('port', process.env.PORT || 3005);

// module.exports = app

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/cadastroRouter');
const loginRouter = require('./routes/loginRouter');
const app = express();

app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());

// app.use('/api', taskRouter);
app.use('/api', userRouter);
// app.use('/api', tabelaRouter);
app.use('/api', loginRouter)

module.exports = app;