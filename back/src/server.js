// Importa a aplicação Express configurada a partir do arquivo 'app.js'
const app = require('./app');

// Obtém a porta configurada para o servidor a partir da instância do aplicativo Express
const port = app.get('port');

// Inicia o servidor Express e faz com que ele comece a escutar as requisições na porta especificada
app.listen(port, () => console.log(`Rodando na porta ${port}`));
