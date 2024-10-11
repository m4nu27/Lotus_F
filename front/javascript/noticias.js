const apiKey = '64a63c8792d549cba2e774a5dd9b5060'; // Insira sua chave da NewsAPI aqui
const newsContainer = document.getElementById('news-container');

// Função para buscar notícias da API
async function fetchNews() {
    console.log("Tentando buscar notícias...");
    try {
        // Refina a query para focar em 'depressão pós-parto' e outras variações
        const url = `https://newsapi.org/v2/everything?q="depressão-pós-parto" OR "depressão materna" OR "depressão pós-natal"&language=pt&apiKey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Dados recebidos da API:", data); // Verifique os dados
        displayNews(data.articles);
    } catch (error) {
        console.error("Erro ao buscar as notícias:", error);
    }
}

// Botão de voltar
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function() {
    window.history.back();  // Volta para a página anterior
});


// Função para exibir notícias
function displayNews(articles) {
    // Limpa o conteúdo antigo
    newsContainer.innerHTML = ''; 

    // Verifica se há artigos para exibir
    if (articles.length === 0) {
        console.log("Nenhuma notícia encontrada.");
        newsContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
    }

    // Loop pelos artigos recebidos
    articles.forEach(article => {
        console.log("Exibindo notícia:", article.title); // Verificando título da notícia
        const newsArticle = document.createElement('article');

        // Adiciona o conteúdo da notícia
        newsArticle.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'Descrição não disponível.'}</p>
            <a href="${article.url}" target="_blank">Leia mais</a>
        `;

        // Adiciona a notícia ao container
        newsContainer.appendChild(newsArticle);
    });
}




// Atualiza as notícias a cada 30 segundos
setInterval(fetchNews, 30050)

// Testando o reload da tela
//setInterval(displayNews, 30050)

// Chama a função pela primeira vez ao carregar a página
fetchNews();
