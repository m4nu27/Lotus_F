const connection = require('../config/db.js');
const dotenv = require('dotenv').config();

async function storeUser(request, response){
    const params = Array(
        request.body.nome,
        request.body.data_nascimento,
        request.body.email,
        request.body.senha,
        request.body.tipo_usuario,
    );


    const query = 'INSERT INTO usuario(nome, data_nascimento, email, senha, tipo_usuario) VALUES (?, ?, ?, ?, ? )';

    connection.query(query, params, (err, results) => {
        console.log(err)
        if (results) {
            response 
                .status(201)
                .json({
                    success: true,
                    massage: "Sucesso!",
                    data: results
                })
            
        }else{
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(",
                    data: err
                })
        }
    })
}

// async function getIDUser(request, response){
//     const params = Array(
//       // AQUI
//     );

//     const query = 'SELECT id, tipo_usuario FROM cadastro_usuario) VALUES (?)';

//     connection.query(query, params, (err, results) => {
//         console.log(err)
//         if (results) {
//             response 
//                 .status(201)
//                 .json({
//                     success: true,
//                     massage: "ID e Tipo recuperados com sucessso!",
//                     data: results
//                 })

//             // localStorage.setItem('id: ', results.data.id)
            
//             // Id_User = 

//             if (results.data.tipo_usuario === 'Instituição') {
//                 window.location.href = "/front/html/perfil_insti.html";
//             }

//         }else{
//             response
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: "Ops, deu problema :(",
//                     data: err
//                 })
//         }
//     })
// }

// async function getUser(request, response) {    
//     const params = Array(
//         request.params.id
//     )
//     console.log(params)

//     const query = 'SELECT * FROM cadastro_usuario WHERE id_user = ?';

//     connection.query(query, params, (err, results) => {
//         console.log(err, results)
//         if (results) {
//             response.status(200).json({
//                 success: true,
//                 message: "Dados com sucesso!",
//                 data: results
//             });
//         } else {
//             response.status(400).json({
//                 success: false,
//                 message: "Erro ao recuperar Dados.",
//                 data: err
//             });
//         }
//     });
// }

module.exports = {
    storeUser
}