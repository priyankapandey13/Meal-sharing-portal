const mysql = require('mysql')

let pool

const getDBConnection = () => {
  // if (connection) return connection

  pool = mysql.createPool({
    connectionLimit : 10,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  pool.connect((err) => {
    if (err) {
      console.error('Connection unsuccessful', err)
    } else {
      console.log('Successful connect')
    }
  })

  return pool
}

module.exports = getDBConnection()
