import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.DB_HOST // Your Data Base host
const user = process.env.DB_USER  // Your Data Base user
const password = process.env.DB_PASSWORD // Your Data Base password
const database = process.env.DB_NAME // Your Data Base schema name


const connection = mysql.createConnection({
    host,
    user,
    password,
    database
  })


export default connection