// Importa o pacote express, que é usado para criar o servidor web e gerenciar rotas, middleware e requisições HTTP
const express = require('express');

// Importa o pacote dotenv para carregar variáveis de ambiente a partir de um arquivo .env
const dotenv = require('dotenv');

// Importa o pacote cors para permitir o compartilhamento de recursos entre diferentes origens (Cross-Origin Resource Sharing)
// Isso é útil para permitir que a API seja acessada de diferentes domínios
const cors = require('cors');

// Importa o roteador de cadastro de usuários (userRouter) que gerencia as rotas relacionadas ao cadastro de usuários
const userRouter = require('./routes/cadastroRouter');

// Importa o roteador de login (loginRouter) que gerencia as rotas relacionadas ao login de usuários
const loginRouter = require('./routes/loginRouter');

// Cria uma instância da aplicação Express, que será usada para configurar o servidor e gerenciar rotas e middleware
const app = express();

// Configura a porta na qual o servidor vai escutar as requisições
// Ele usa a porta definida na variável de ambiente PORT, ou a porta 3005 como padrão se a variável não estiver definida
app.set('port', process.env.PORT || 3005);

// Habilita o uso de CORS na aplicação, permitindo que a API seja acessada a partir de diferentes domínios
app.use(cors());

// Adiciona um middleware para analisar requisições com conteúdo JSON
// Isso permite que a aplicação processe o corpo das requisições JSON automaticamente
app.use(express.json());

// Define que todas as rotas gerenciadas pelo userRouter serão acessíveis a partir do caminho base '/api'
app.use('/api', userRouter);

// Define que todas as rotas gerenciadas pelo loginRouter serão acessíveis a partir do caminho base '/api'
app.use('/api', loginRouter);

const express = require('express');
const bodyParser = require('body-parser');
const emocoesRouter = require('./routes/emocoesRouter');

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Usar as rotas de emoções
app.use('/', emocoesRouter);

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


// Exporta a instância do aplicativo Express para que ela possa ser usada em outros arquivos
// Será usada no arquivo principal para iniciar o servidor e escutar as requisições
module.exports = app;


