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
