import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { getPnfs } from '#querys/pnf/getPnf.js'
import { getSimpleSubjectList } from '#querys/subjects/getSimpleSubjectList.js'
import { getTrayectos } from '#querys/trayecto/getTrayectos.js'
import getInscriptionData from '#proyeccion/getInscriptionData.js'
import getPNFPensum from '#proyeccion/getPNFPensum.js'
import Turnos from '#models/Turnos.js'
const Router = express.Router()

// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Router.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontEnd', 'index.html'))
})

Router.get('/pnfs', async (_, res) => {
  const pnfs = await getPnfs()
  res.json(pnfs)
})

Router.get('/subjects', async (_, res) => {
  const subjects = await getSimpleSubjectList()
  res.json(subjects)
})

Router.get('/trayectos', async (_, res) => {
  const trayectos = await getTrayectos()
  res.json(trayectos)
})

Router.get('/turnos', async (_, res) => {
  const turnos = await Turnos.findAll({ raw: true })
  res.json(turnos)
})

Router.get('/proyecciones/inscriptionData/:pnf/:trayecto', getInscriptionData)

Router.get('/proyecciones/pensum/:pnf/:trayecto', getPNFPensum)

export default Router
