import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { getPnfs } from '#querys/pnf/getPnf.js'
import { getSimpleSubjectList } from '#querys/subjects/getSimpleSubjectList.js'
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

Router.get('/subjects', async (req, res) => {
  const subjects = await getSimpleSubjectList()
  res.json(subjects)
})

export default Router
