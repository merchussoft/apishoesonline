const getEnvironment = (k) => {
    return process.env[k];
}

const getNumberEnv = (k=3000) => {
    return Number(getEnvironment(k));
}

const nodeEnv = () => {
    return getEnvironment('NODE_ENV')?.trim() || '';   
}

const createPathEnv = (path) => {
    const arr_env = ['env'];

    if(path.length) {
        const string_to_array = path.split('.');
        arr_env.unshift(...string_to_array);
    }

    return '.' + arr_env.join('.');
}

const mysqlConfig = () => {
    return {
        host: getEnvironment('DB_HOST'),
        user: getEnvironment('DB_USER'),
        password: getEnvironment('DB_PASS'),
        database: getEnvironment('DB_NAME'),
        port: getEnvironment('DB_PORT'),
        charset: 'utf8mb4'
    }
}

module.exports = {
    getEnvironment,
    getNumberEnv,
    nodeEnv,
    createPathEnv,
    mysqlConfig
}