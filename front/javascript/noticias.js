// Chave da API da NewsAPI
const apiKey = '64a63c8792d549cba2e774a5dd9b5060'; // Insira sua chave da NewsAPI aqui

// Seleciona o contêiner onde as notícias serão exibidas
const newsContainer = document.getElementById('news-container');

// Função para buscar notícias da API
async function fetchNews() {
    console.log("Tentando buscar notícias..."); // Log para indicar que a busca começou
    try {
        // Cria a URL da API com o parâmetro de busca, idioma e a chave da API
        // Adiciona um timestamp para evitar cache da resposta
        const url = `https://newsapi.org/v2/everything?q="depressão-pós-parto"&language=pt&apiKey=${apiKey}&_=${new Date().getTime()}`;
        const response = await fetch(url); // Faz a requisição GET à API
        if (!response.ok) { // Verifica se a resposta não foi bem-sucedida
            throw new Error(`Erro: ${response.statusText}`); // Lança um erro com a mensagem correspondente
        }
        const data = await response.json(); // Converte a resposta em JSON
        console.log("Dados recebidos da API:", data); // Exibe os dados recebidos no console para depuração
        displayNews(data.articles); // Chama a função para exibir as notícias
    } catch (error) {
        console.error("Erro ao buscar as notícias:", error); // Exibe o erro no console em caso de falha
    }
}

// Seleciona o botão "Voltar" e adiciona um event listener
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
    window.history.back(); // Retorna para a página anterior no histórico do navegador
});

// Função para exibir as notícias no contêiner
function displayNews(articles) {
    // Limpa qualquer conteúdo antigo no contêiner
    newsContainer.innerHTML = '';

    // Verifica se há artigos na resposta
    if (articles.length === 0) {
        console.log("Nenhuma notícia encontrada."); // Log para indicar que não há notícias
        newsContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>'; // Exibe uma mensagem na página
        return; // Sai da função
    }

    // Itera sobre os artigos e os adiciona ao contêiner
    articles.forEach(article => {
        console.log("Exibindo notícia:", article.title); // Log com o título da notícia para depuração

        // Cria um elemento HTML para a notícia
        const newsArticle = document.createElement('article');

        // Adiciona o conteúdo da notícia ao elemento
        newsArticle.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'Descrição não disponível.'}</p> <!-- Exibe a descrição ou uma mensagem alternativa -->
            <a href="${article.url}" target="_blank">Leia mais</a> <!-- Link para a notícia completa -->
        `;

        // Adiciona o elemento criado ao contêiner de notícias
        newsContainer.appendChild(newsArticle);
    });
}

// Configura um intervalo para atualizar as notícias a cada 30 segundos
setInterval(fetchNews, 30000);

// Chama a função para buscar notícias ao carregar a página
fetchNews();
