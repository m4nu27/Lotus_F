const connection = require('../config/db.js');

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

// exports.registrarEmocao = async (req, res) => {
//     const { data, emocao, observacao } = req.body;

//     try {
//         const [result] = await db.execute(
//             'INSERT INTO emocoes (data, emocao, observacao) VALUES (?, ?, ?)',
//             [data, emocao, observacao]
//         );
//         res.status(201).json({ message: 'Emoção registrada com sucesso!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Erro ao registrar emoção.' });
//     }
// };








async function obterEmocoes (request, response){
    const params = Array(
        request.params.data
    )

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