const connection = require('../config/db.js'); // Assumindo que você tem um arquivo de conexão com o banco de dados

// Função para registrar uma emoção
async function registrarEmocao (request, response){
    const params = Array(
        request.body.emocao,
        request.body.observacao
    )

    const query = `INSERT INTO emocoes (emocao, observacao) VALUES (?, ?)`

    connection.query(query, params, (err, results) => {
        if(results) {
            response 
                    .status(201)
                    .json({
                        success: true,
                        message: "Emoção registrada com sucesso!", 
                        data: results})
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(", 
                    data: err                         
                });
         }
    })
};

// Função para obter emoções por data
// exports.obterEmocoesPorData = async (req, res) => {
//     const { data } = req.params;

//     try {
//         const [rows] = await db.execute(
//             'SELECT emocao, observacao FROM emocoes WHERE data = ?',
//             [data]
//         );
//         res.status(200).json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erro ao obter emoções.' });
//     }
// };

module.exports = {
    registrarEmocao
}