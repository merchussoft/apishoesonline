CREATE DATABASE IF NOT EXISTS imagenes_prueba;

CREATE TABLE IF NOT EXISTS image_metadata (
    cod_image_metadata INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) UNIQUE,
    mime_type VARCHAR(50),
    fieldname VARCHAR(50),
    size INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS images (
    cod_image INT AUTO_INCREMENT PRIMARY KEY,
    image_data LONGBLOB, -- Almacenaremos la imagen comprimida aquí
    cod_image_metadata INT,
    url VARCHAR(255),
    FOREIGN KEY (cod_image_metadata) REFERENCES image_metadata(cod_image_metadata)
);