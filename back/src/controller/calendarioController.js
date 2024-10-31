const connection = require('../config/db.js');

// Função para registrar uma emoção
async function registrarEmocao (request, response){
    const params = Array(
        request.body.data,
        request.body.emocao,
        request.body.observacao
    )

    const query = `INSERT INTO emocoes (data, emocao, observacao) VALUES (?, ?, ?)`

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



//Função para obter emoção
// async function obterEmocoes (request, response) {
//     const { data } = request.params;

//     const query = `SELECT data, emocao, observacao FROM emocoes WHERE data = ?`;
//     const params = [data];

//     connection.query(query, params, (err, results) => {
//         if (results.length > 0) {
//             response
//                 .status(200)
//                 .json({
//                     success: true,
//                     message: "Emoções obtidas com sucesso!",
//                     data: results
//                 });
//         } else {
//             response
//                 .status(500)
//                 .json({
//                     success: false,
//                     message: "Nenhuma emoção encontrada para essa data.",
//                     data: err
//                 });
//         }
//     });
// }


//obter datas com registro de emoção
async function obterDatasComEmocoes(request, response) {
    const query = `SELECT DISTINCT data FROM emocoes`;
    
    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                data: results
            });
        } else {
            response.status(500).json({
                success: false,
                message: "Erro ao obter datas com emoções.",
                data: err
            });
        }
    });
};

async function marcarDatasComEmocoes() {
    try {
        const response = await fetch(`http://127.0.0.1:3020/api/datas-com-emocoes`);
        const { data } = await response.json();

        data.forEach(item => {
            const [ano, mes, dia] = item.data.split('-');
            if (+ano === currYear && +mes - 1 === currMonth) {
                const diaElement = document.querySelector(`li[data-dia="${+dia}"]`);
                if (diaElement) {
                    diaElement.classList.add('has-emotion'); // Adiciona classe de marcação
                }
            }
        });
    } catch (error) {
        console.error('Erro ao obter datas com emoções:', error);
    }
}

const renderCalendar = () => {
    // Geração do calendário
    daysTag.innerHTML = liTag;

    // Marca datas com emoções registradas após renderizar
    marcarDatasComEmocoes();
};


module.exports = {
    registrarEmocao,
    // obterEmocoes,
    obterDatasComEmocoes
};