/** @type {import('typeorm').ConnectionOptions} */
const connectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'docker',
  password: 'docker',
  database: 'gobarber',
};

module.exports = connectionOptions;
