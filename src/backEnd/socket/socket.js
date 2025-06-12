import { Server } from 'socket.io'
// import validateTeacherData from '#utils/validateTeacherData.js'

import getTeacherList from '#querys/teachers/getTeacherList.js'
import { checkIfProyectionExists } from './socketUtils.js'
import { updateProyection } from '../dataBase/create/updateProyection.js'
import Config from '#models/config.js'

let io = null

let currentProyectionId = ''

// Array de profesores
let teachers = {
  q1: [],
  q2: [],
  q3: []
}

// array de asignaturas
let subjects = []

// array de proyecciones realizadas
let proyectionsDone = []

// Nombre de la proyección
let proyectionName = 'desconocido'
let proyectionId = null

// Verificar si hay una proyeccion activa
const loadProyection = async () => {
  await setTeacherList()
  // se obtiene el id de la proyeccion activa
  const requestConfigData = await Config.findOne({ where: { id: 1 }, raw: true })
  if (requestConfigData?.active_proyection) {
    currentProyectionId = requestConfigData?.active_proyection
  }

  // se obtienen los datos de la proyeccion activa
  const request = await checkIfProyectionExists(currentProyectionId)
  if (request.error) {
    console.log(request.message)
    setTeacherList()
    return
  }
  proyectionName = request.data.name
  proyectionId = request.data.id
  const proyeccion = request.data

  if (proyeccion?.subjects) {
    subjects = await JSON.parse(proyeccion.subjects)
  }
  if (proyeccion?.proyections_done) {
    proyectionsDone = await JSON.parse(proyeccion.proyections_done)
  }
}

export async function setTeacherList () {
  const teacherList = await getTeacherList()

  teachers = {
    q1: [...teacherList],
    q2: [...teacherList],
    q3: [...teacherList]
  }
  io?.emit('updateTeachers', teachers)
}

export default function setupSocket (server, sessionMiddleware) {
  io = new Server(server, {
    cors: {
      origin: '*'
      // credentials: true
    }
  })
  // io.engine.use(sessionMiddleware)
  // Conexión WebSocket
  io.on('connection', (socket) => {
    // console.log('Usuario conectado')

    // Enviar el array de profesores y asignaturas al cliente
    socket.emit('updateTeachers', teachers)
    socket.emit('updateSubjects', subjects)
    socket.emit('proyectionsDone', proyectionsDone)
    socket.emit('proyectionData', { proyectionName, proyectionId })

    // Escuchar eventos de actualización de profesores
    socket.on('updateTeachers', (newTeachers) => {
      /* const validName = validateTeacherData(newTeachers)
      if (validName.error) {
        console.log(validName.error.message)
        return
      } */
      teachers = newTeachers
      updateProyection({
        id: currentProyectionId,
        teachers: JSON.stringify(teachers),
        subjects: JSON.stringify(subjects),
        proyections_done: JSON.stringify(proyectionsDone)
      })

      io.emit('updateTeachers', teachers)
    })

    // Escuchar eventos de actualización de asignaturas
    socket.on('updateSubjects', (newSubjects) => {
      /* const validName = validateSubjectData(newSubjects);
      if (validName.error) {
        console.log(validName.error);
        return;
      } */

      // Verificar si el usuario ha iniciado sesión antes de actualizar
      /* const user = socket?.request?.session?.user
      if (!user) {
        console.log('El usuario no ha iniciado sesión antes de actualizar la proyección')
        socket.disconnect()
        return
      } */

      subjects = newSubjects
      updateProyection({
        id: currentProyectionId,
        teachers: JSON.stringify(teachers),
        subjects: JSON.stringify(subjects),
        proyections_done: JSON.stringify(proyectionsDone)
      })
      io.emit('updateSubjects', subjects)
    })

    // Escuchar eventos de actualización de proyecciones
    socket.on('proyectionsDone', (newProyections) => {
      proyectionsDone = newProyections
      io.emit('proyectionsDone', proyectionsDone)
    })

    socket.on('reload', () => {
      /*    const user = socket?.request?.session?.user
      if (!user) {
        console.log('El usuario no ha iniciado sesión antes de actualizar la proyección')
        socket.disconnect()
        return
      } */
      loadProyection().then(() => {
        socket.emit('updateTeachers', teachers)
        socket.emit('updateSubjects', subjects)
        socket.emit('proyectionsDone', proyectionsDone)
        socket.emit('proyectionData', { proyectionName, proyectionId })
      })
    })

    // Escuchar eventos de error
    socket.on('error', (error) => {
      console.log(error)
    })
  })

  return io
}

loadProyection()
