import mysql from 'mysql2'


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'market_shcema'
  })


export default connection