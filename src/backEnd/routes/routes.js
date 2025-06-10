import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
// import { getPnfs } from '#querys/pnf/getPnf.js'
// import { getSimpleSubjectList } from '#querys/subjects/getSimpleSubjectList.js'
// import { getTrayectos, puTrayecto, postTrayecto, deleteTrayecto } from '#querys/trayecto/getTrayectos.js'
import getInscriptionData from '#proyeccion/getInscriptionData.js'
import getPNFPensum from '#proyeccion/getPNFPensum.js'
import getProfile from '#querys/profile/getProfile.js'
import getProfileById from '#querys/profile/getProfileById.js'
import getPerfilNames from '#querys/profile/getProfileNames.js'
import setProfile from '#querys/profile/postProfile.js'
// import Turnos from '#models/turnos.js'
import deleteProfile from '#querys/profile/deleteProfile.js'
import addSubjectToProfile from '#querys/profile/addSubjectToPerfil.js'
import getSimpleData from '#querys/simpleData/simpleData.js'
// import postTeacher from '#querys/teachers/postTeacher.js'
// import postSubject from '#querys/subjects/postSubject.js'
import postPensum from '#querys/subjects/postPensum.js'
import deletePensum from '#querys/subjects/deletePensum.js'
import deleteSubjectInProfile from '#querys/profile/deleteSubjectInProfile.js'
// import getTeacherList from '#querys/teachers/getTeacherList.js'
// import postPNF from '#querys/pnf/postPNF.js'
// mport deletePNF from '#querys/pnf/deletePNF.js'
import createProyection from '#querys/proyections/createProyection.js'
import getProyections from '#querys/proyections/getProyection.js'
import getActiveProyection from '#querys/proyections/getActiveProyection.js'
import setActiveProyection from '#querys/proyections/setActiveProyection.js'
/* import {
  createUserController,
  loginUserController,
  getUserController,
  updateUserController,
  deleteUserController
} from '#querys/user/userController.js' */
import { getContractTypes, updateContractType } from '#querys/Contracts/Contracts.js'
import { generateExcelReport } from '../report/excelReport.js'
import userRoutes from './userRoutes/userRoutes.js'
import teacherRoutes from './teacherRoutes/teacherRoutes.js'
import pnfRoutes from './pnfRoutes/pnfRoutes.js'
import subjectsRoutes from './subjectsRoutes/subjectsRoutes.js'
import trayectosRoutes from './trayectosRoutes/trayectosRoutes.js'
import turnosRoutes from './turnosRoutes/turnosRoutes.js'
const Router = express.Router()

// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

Router.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontEnd', 'index.html'))
})

Router.use(userRoutes)
Router.use(teacherRoutes)
Router.use(pnfRoutes)
Router.use(subjectsRoutes)
Router.use(trayectosRoutes)
Router.use(turnosRoutes)

/* Router.get('/teachers', async (_, res) => {
  const teachers = await getTeacherList()
  res.json(teachers)
}) */

/* Router.get('/pnfs', async (_, res) => {
  const pnfs = await getPnfs()
  res.json(pnfs)
}) */

/* Router.get('/subjects', async (_, res) => {
  const subjects = await getSimpleSubjectList()
  res.json(subjects)
}) */

/* Router.get('/trayectos', async (_, res) => {
  const trayectos = await getTrayectos()
  res.json(trayectos)
}) */

/* Router.get('/turnos', async (_, res) => {
  const turnos = await Turnos.findAll({ raw: true })
  res.json(turnos)
}) */

Router.get('/proyecciones/inscriptionData/:pnf/:trayecto', getInscriptionData)

Router.get('/proyecciones/pensum/:pnf/:trayecto', getPNFPensum)

Router.get('/profiles', async (_, res) => {
  const profiles = await getProfile()
  res.json(profiles)
})

Router.get('/profile/:id', getProfileById)

Router.get('/profileNames', async (_, res) => {
  const profileNames = await getPerfilNames()
  res.json(profileNames)
})

Router.get('/simpleData', getSimpleData)

Router.get('/proyeccions', getProyections)

Router.get('/config', getActiveProyection)

Router.get('/contractTypes', getContractTypes)

// Router.get('/user', getUserController)

/// ///////////put

/* Router.put('/trayectos', express.json(), async (req, res) => {
  const trayectos = await puTrayecto(req.body)
  res.json(trayectos)
}) */

Router.put('/contractType', express.json(), updateContractType)

// Router.put('/user', express.json(), updateUserController)

// ///////////post

Router.post('/setProyection', express.json(), setActiveProyection)

// Router.post('/subject', express.json(), postSubject)

/* Router.post('/trayectos', express.json(), async (req, res) => {
  const trayectos = await postTrayecto(req.body)
  res.json(trayectos)
}) */

Router.post('/profile', express.json(), async (req, res) => {
  const response = await setProfile(req.body)
  res.send(response)
})

Router.post('/profile/addSubject', express.json(), addSubjectToProfile)

// Router.post('/teacher', express.json(), postTeacher)

Router.post('/pensum', express.json(), postPensum)

// Router.post('/pnf', express.json(), postPNF)

Router.post('/proyeccion', express.json(), createProyection)

// Router.post('/user', express.json(), createUserController)

// Router.post('/login', express.json(), loginUserController)

Router.post('/excelreport', express.json(), generateExcelReport)

// //////////delete

/* Router.delete('/trayectos', express.json(), async (req, res) => {
  const trayectos = await deleteTrayecto(req.body)
  res.json(trayectos)
})
 */
Router.delete('/profile/:perfil_name_id', deleteProfile)

Router.delete('/subjectinprofile/:id', deleteSubjectInProfile)

Router.delete('/pensum/:id', deletePensum)

// Router.delete('/pnf/:id', deletePNF)

// Router.delete('/user', express.json(), deleteUserController)

Router.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontEnd', 'index.html'))
})

export default Router
