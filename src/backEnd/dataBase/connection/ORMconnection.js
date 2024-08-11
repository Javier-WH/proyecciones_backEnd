/**
 * Este archivo es para realizar la coneccion a la base de datos con sequelize
 */
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

let connection = null

function ORMconnection () {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT || 'mysql',
      port: process.env.DB_PORT
    }
  )
  return sequelize
}

export default async function getConection () {
  if (!connection) {
    connection = await ORMconnection()
  }

  return connection
}

export function closeConection () {
  if (!connection) return
  connection.close()
  connection = null
  console.log('La base de datos se cerro correctamente')
}

export async function resetConection () {
  await closeConection()
  await getConection()
}

export async function testConection () {
  if (!connection) {
    await getConection()
  }
  try {
    await connection.authenticate()
    console.log('La base de datos se conecto correctamente')
    return true
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return false
  }
}
