// Aguarda o DOM ser carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    const perfilContainer = document.querySelector('.profile-details'); // Seleciona o contêiner onde os perfis serão exibidos

    // Função para buscar perfis do servidor
    const fetchPerfis = async () => {
        try {
            const response = await fetch('http://localhost:3020/api/perfis'); // Faz uma requisição GET à API para obter perfis
            if (!response.ok) { // Verifica se a resposta HTTP não foi bem-sucedida
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`); // Lança um erro com o status da resposta
            }
            const perfis = await response.json(); // Converte a resposta em JSON

            // Verifica se a resposta da API é um array antes de processá-la
            if (!Array.isArray(perfis)) {
                throw new Error('A resposta da API não é um array');
            }

            // Exibe os perfis no contêiner com base nos dados recebidos
            perfilContainer.innerHTML = perfis.map(perfil => `
                <div class="profile-item">
                    <p><strong>Nome:</strong> ${perfil.nome}</p>
                    <p><strong>Email:</strong> ${perfil.email}</p>
                    <button class="delete-btn" data-id="${perfil.id}">Excluir</button> <!-- Botão para excluir o perfil -->
                </div>
            `).join(''); // Junta todos os elementos em uma string única
        } catch (error) {
            console.error('Erro ao buscar perfis:', error.message); // Exibe um erro no console em caso de falha
            // Mostra uma mensagem de erro no contêiner caso a busca falhe
            perfilContainer.innerHTML = '<p>Não foi possível carregar os perfis. Tente novamente mais tarde.</p>';
        }
    };

    // Função para excluir um perfil
    const deletePerfil = async (id) => {
        try {
            // Faz uma requisição DELETE à API, enviando o ID do perfil na URL
            const response = await fetch(`http://localhost:3020/api/perfis/${id}`, { method: 'DELETE' });
            if (!response.ok) { // Verifica se a resposta HTTP não foi bem-sucedida
                const errorData = await response.json(); // Obtém detalhes do erro se disponíveis
                throw new Error(errorData.message || 'Erro ao excluir perfil'); // Lança um erro com a mensagem recebida ou uma genérica
            }
            const result = await response.json(); // Converte a resposta em JSON
            alert(result.message); // Exibe uma mensagem de sucesso ao usuário
            fetchPerfis(); // Atualiza a lista de perfis após a exclusão
        } catch (error) {
            console.error('Erro ao excluir perfil:', error.message); // Exibe o erro no console
            alert(`Não foi possível excluir o perfil: ${error.message}`); // Mostra um alerta ao usuário
        }
    };

    // Adiciona um event listener para tratar cliques no contêiner dos perfis
    perfilContainer.addEventListener('click', (e) => {
        // Verifica se o clique foi em um botão de exclusão
        if (e.target.classList.contains('delete-btn')) {
            const perfilId = e.target.getAttribute('data-id'); // Obtém o ID do perfil a ser excluído
            // Exibe uma mensagem de confirmação antes de excluir
            if (confirm('Tem certeza que deseja excluir este perfil?')) {
                deletePerfil(perfilId); // Chama a função de exclusão com o ID do perfil
            }
        }
    });

    // Chama a função para buscar e exibir os perfis ao carregar a página
    fetchPerfis();
});
