import { createServer } from 'node:http'
import express from 'express'
import dotenv from 'dotenv'
import configureStatic from './config/static/configureStatic.js'
import configureCors from './config/cors/corsConfig.js'
import Routes from './routes/routes.js'
import setupSocket from './socket/socket.js'
import getServerIP from './utils/serverIP.js'
import { createTables } from './dataBase/create/createTables.js'
import setTableRelations from './dataBase/relations/tableRelations.js'
import syncSagaTables from './dataBase/sycnSagaDB/syncSagaTables.js'

dotenv.config()
const app = express()
const server = createServer(app)

// base de datos
createTables()
setTableRelations()
syncSagaTables()

// cors
configureCors(app)

// archivos estaticos
configureStatic(app)

// rutas
app.use(Routes)

// socket
setupSocket(server)

const port = process.env.PORT || 3000
const host = process.env.IP || '127.0.0.1'
server.listen(port, host, () => {
  // console.clear()
  console.log(`Servidor corriendo en el socket http://${getServerIP()}:${port}`)
})
