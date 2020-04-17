const mysql = require('mysql')

let connection

const getDBConnection = () => {
  // if (connection) return connection

  connection = mysql.createPool({
    connectionLimit : 10,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })

  connection.connect((err) => {
    if (err) {
      console.error('Connection unsuccessful', err)
    } else {
      console.log('Successful connect')
    }
  })

  return connection
}

module.exports = getDBConnection()
