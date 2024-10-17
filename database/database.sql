CREATE DATABASE IF NOT EXISTS imagenes_prueba;

CREATE TABLE IF NOT EXISTS imagenes_prueba.image_metadata (
    cod_image_metadata INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) UNIQUE,
    mime_type VARCHAR(50),
    fieldname VARCHAR(50),
    size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS imagenes_prueba.images (
    cod_image INT AUTO_INCREMENT PRIMARY KEY,
    image_data LONGBLOB, -- Almacenaremos la imagen comprimida aquí
    cod_image_metadata INT,
    url VARCHAR(255),
    FOREIGN KEY (cod_image_metadata) REFERENCES image_metadata(cod_image_metadata)
);


CREATE DATABASE IF NOT EXISTS admin_imagenes_prueba;

CREATE TABLE IF NOT EXISTS admin_imagenes_prueba.usuarios(
	cod_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cod_perfil INT(11),
    FOREIGN KEY (cod_perfil) REFERENCES perfiles(cod_perfil)
);

CREATE TABLE IF NOT EXISTS admin_imagenes_prueba.perfiles(
    cod_perfil INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    active TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_imagenes_prueba.perfiles(nombre)VALUES('super_admin'),('admin'),('auxiliar');