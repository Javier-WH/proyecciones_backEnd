/*
* Este archivo es para realizar la prueba de la base de datos desde la consola
* Ejemplo: npm run testDB
*/

import { testConection } from '../connection/ORMconnection.js'

async function testDatabase () {
  try {
    await testConection()
    process.exit(0)
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error)
    process.exit(1)
  }
}

testDatabase()
