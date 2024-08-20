// const connection = require('../config/db.js');

// //arquivo de configuração onde ficam minhas variáveis de ambiente
// const dotenv = require('dotenv').config();
// const { response } = require('express') // possível problema

// //função que não retorna instantaneamente, aguarda a informação e depois retorna
// async function login(req, res) {

//     const params = Array(
//         req.body.email
//     )
//     console.log("email p/ cadastro:", req.body.email)

//     //inserção no banco de dados
//     const query = "SELECT email, senha, id, tipo_usuario FROM usuario WHERE email = ?";

//     connection.query(query, params, (err, results) => {
//         console.log(err, results)
//         if(results.length > 0) {
//             let senhaForms = req.body.senha
//             let senhaDb = results[0].senha

//             if (senhaDb === senhaForms)
//                 console.log('Senha Correta!')   
//                 res
//                     .status(200)
//                     .json({
//                         success: true,
//                         message: "Login feito com Sucesso",
//                         data: results[0]
//                 });        
//             } else {
//                 res
//                     .status(400)
//                     .json({
//                         success: false,
//                         message: "Verifique sua Senha",
//                         data: results
//                 });  
//         }
//     });
// };

// module.exports = {
//     login
// }

const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

exports.login = (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuario WHERE email = ?';
    
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error', success: false });
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const user = results[0];

        // Verificar senha
        bcrypt.compare(password, user.senha, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Error comparing passwords', success: false });
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password', success: false });
            }

            // Sucesso na autenticação
            res.status(200).json({ message: 'Login successful', success: true });
        });
    });
};