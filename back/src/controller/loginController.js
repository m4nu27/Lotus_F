const connection = require('../config/db.js');
const dotenv = require('dotenv').config();
const { response } = require('express') // possível problema


async function login(req, res) {

    const params = Array(
        req.body.email
    )
    console.log("email p/ cadastro:", req.body.email)

    const query = "SELECT email, senha, id, tipo_usuario FROM usuario WHERE email = ?";

    connection.query(query, params, (err, results) => {
        console.log(err, results)
        if(results.length > 0) {
            let senhaForms = req.body.senha
            let senhaDb = results[0].senha

            if (senhaDb === senhaForms)
                console.log('Senha Correta!')   
                res
                    .status(200)
                    .json({
                        success: true,
                        message: "Login feito com Sucesso",
                        data: results[0]
                });        
            } else {
                res
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique sua Senha",
                        data: results
                });  
        }
    });
};

module.exports = {
    login
}