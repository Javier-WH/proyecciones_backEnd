/*
* Este archivo es para realizar la sincronización de la base de datos desde la consola,
* El primer parametro es el forceSync (true o false), en true borrara la base de datos y la crea de nuevo.
* El segundo parametro es el alterTables (true o false), hace modicaciones en la base de datos sin borrarla.
* Ejemplo: npm run syncDB true true
*/

import getConection from '../connection/ORMconnection.js'

async function syncDatabase (force = false, alter = false) {
  try {
    const sequelize = await getConection()
    await sequelize.sync({ force, alter })
    console.log('Base de datos sincronizada correctamente')
    process.exit(0)
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error)
    process.exit(1)
  }
}

const [, , forceSyncArg, alterArg] = process.argv

const forceSync = forceSyncArg === 'true'
const alterTables = alterArg === 'true'

syncDatabase(forceSync, alterTables)
