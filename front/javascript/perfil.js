document.addEventListener('DOMContentLoaded', () => {
    const perfilContainer = document.querySelector('.profile-details');

    // Função para buscar perfis do servidor
    const fetchPerfis = async () => {
        try {
            const response = await fetch('http://localhost:3020/api/perfis'); // Certifique-se de que a URL está correta
            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
            }
            const perfis = await response.json();

            // Verifique se `perfis` é um array antes de usar .map()
            if (!Array.isArray(perfis)) {
                throw new Error('A resposta da API não é um array');
            }

            // Exibindo perfis na tela
            perfilContainer.innerHTML = perfis.map(perfil => `
                <div class="profile-item">
                    <p><strong>Nome:</strong> ${perfil.nome}</p>
                    <p><strong>Email:</strong> ${perfil.email}</p>
                    <button class="delete-btn" data-id="${perfil.id}">Excluir</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Erro ao buscar perfis:', error.message);
            perfilContainer.innerHTML = '<p>Não foi possível carregar os perfis. Tente novamente mais tarde.</p>';
        }
    };

    // Função para excluir um perfil
    const deletePerfil = async (id) => {
        try {
            const response = await fetch(`http://localhost:3020/api/perfis/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao excluir perfil');
            }
            const result = await response.json();
            alert(result.message);
            fetchPerfis(); // Atualiza a lista após exclusão
        } catch (error) {
            console.error('Erro ao excluir perfil:', error.message);
            alert(`Não foi possível excluir o perfil: ${error.message}`);
        }
    };

    // Event listener para excluir perfil
    perfilContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const perfilId = e.target.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir este perfil?')) {
                deletePerfil(perfilId);
            }
        }
    });

    // Carregar perfis ao carregar a página
    fetchPerfis();
});