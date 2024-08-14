CREATE DATABASE db_Lotus;
USE db_Lotus;

-- CREATE TABLE usuario(
	-- id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   -- nome VARCHAR(120) NOT NULL,
   -- data_nascimento DATETIME,
   -- email VARCHAR(120) UNIQUE NOT NULL,
   -- senha VARCHAR(120) NOT NULL,
    -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE usuario(
	 id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL UNIQUE,
    tipo_usuario ENUM('Colaborador', 'Instituição') NOT NULL,
    endereco VARCHAR(255) NOT NULL
);
 
SELECT * FROM usuario;

DROP TABLE usuario;