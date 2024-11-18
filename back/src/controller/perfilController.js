// Importa a configuração da conexão com o banco de dados
const db = require('../config/db.js');

// Função para buscar todos os perfis de usuário do banco de dados
const getPerfis = async (req, res) => {
    try {
        // Executa uma consulta SQL para buscar os campos `id`, `nome` e `email` da tabela `usuario`
        const [rows] = await db.query('SELECT id, nome, email FROM usuario');
        
        // Retorna os resultados em formato JSON
        // Garante que retorna sempre um array (mesmo que vazio) para evitar problemas no cliente
        res.json(rows || []);
    } catch (error) {
        // Log detalhado do erro no console, útil para depuração
        console.error('Erro no getPerfis:', error);
        
        // Retorna uma resposta de erro com status HTTP 500 (Erro interno no servidor)
        res.status(500).json({ message: 'Erro ao buscar perfis.' });
    }
};

// Função para excluir um perfil de usuário do banco de dados
const deletePerfil = async (req, res) => {
    // Obtém o `id` do perfil a ser excluído a partir dos parâmetros da URL
    const { id } = req.params;

    try {
        // Executa uma consulta SQL para deletar o usuário com o `id` especificado
        const [result] = await db.query('DELETE FROM usuario WHERE id = ?', [id]);

        // Verifica se alguma linha foi afetada (ou seja, se o `id` existia)
        if (result.affectedRows === 0) {
            // Caso nenhuma linha tenha sido deletada, retorna status HTTP 404 (Não encontrado)
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }

        // Retorna uma mensagem de sucesso se o perfil foi deletado
        res.json({ message: 'Perfil excluído com sucesso!' });
    } catch (error) {
        // Log detalhado do erro no console, útil para depuração
        console.error('Erro no deletePerfil:', error);

        // Retorna uma resposta de erro com status HTTP 500 (Erro interno no servidor)
        res.status(500).json({ message: 'Erro ao excluir perfil.' });
    }
};

// Exporta as funções `getPerfis` e `deletePerfil` para serem utilizadas em outros módulos
module.exports = { getPerfis, deletePerfil };
