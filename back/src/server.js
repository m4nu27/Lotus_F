// // Módulo de inicialização do servidor web onde a nossa webapi estará hospedada

// // Importar o arquivo app
// const app = require('./app');

// // Importar a porta do servidor
// const port = app.get('port');

// // Testar API
// app.listen(port, () => console.log(`Run on port ${port}!`));

const app = require('./app');
const port = app.get('port');

app.listen(port, () => console.log(`Rodando na porta ${port}`));