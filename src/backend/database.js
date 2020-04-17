const mysql = require('mysql')
const getDBPool = () => {
  return mysql.createPool({
    connectionLimit : 10,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  })
}
module.exports = getDBPool();
