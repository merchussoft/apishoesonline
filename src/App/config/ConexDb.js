const mysql2 = require('mysql2/promise');
const { mysqlConfig } = require('./Config');

const getConnection = async () => {
    try {
        const conn = mysql2.createConnection(mysqlConfig());
        console.log('Successful connection to the database');
        return conn;
    } catch (err) {
        console.err("Error al conectar a la base de datos =====> ", err);
        throw err;
    }
}

const resultPromise = async (sql, data = []) => {
    let conex;
    try {
        conex = await getConnection();
        await conex.query('SET lc_time_names="es_ES"');
        const [rows] = await conex.query(sql, data);
        return {code: 200, data: rows }
    } catch (err) {
        console.error('Error al realizar el query: ', err);
        return { code: 406, data: {}, message: err.sqlMessage, sql: err.sql || sql };
    } finally {
        if(conex){
            await conex.end();
            console.log('Conexion Cerrada...');
        }
    }
}

const obtieneDatos = async (data) => {
    let campos = ('lista_campos' in data) ? data.lista_campos.toString() : '*';
    let adicional = ('str_adicional' in data) ? data.str_adicional : '';
    let campo = ('campo' in data) ? data.campo : 1;
    let valor = ('valor' in data) ? data.valor : 1;
    let sql = `SELECT ${campos}
               FROM ${data.table}
               WHERE ${campo} = ${valor} ${adicional}`;
    return await resultPromise(sql);
}


const insertTable = async (table, data= {}) => {
    let campos = Object.keys(data).toString();
    let values_insert = [];
    for(let i = 0; i < Object.keys(data).length; i ++) values_insert.push('?');
    let sql_insert = `INSERT INTO ${table}(${campos})VALUES(${values_insert.toString()})`;
    let result_insert = await resultPromise(sql_insert, Object.values(data))
    let error_data = {code: result_insert.code, 'data': result_insert.data.insertId};
    if(result_insert.code === 406 ) error_data = result_insert;
    return error_data;
}

module.exports = {
    resultPromise,
    obtieneDatos,
    insertTable
}