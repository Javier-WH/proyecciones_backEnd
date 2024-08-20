import { Server } from 'socket.io'
import validateTeacherData from '#utils/validateTeacherData.js'
import validateSubjectData from '#utils/validateSubject.js'
import getTeacherList from '#querys/teachers/getTeacherList.js'
import getSubjectList from '#querys/subjects/getSubjectList.js'

let io = null

// Array de profesores
let teachers = {
  q1: [],
  q2: [],
  q3: []
}

// array de asignaturas
let subjects = []

export function setTeacherList () {
  getTeacherList().then((data) => {
    // console.log(data)
    teachers = {
      q1: [...data],
      q2: [...data],
      q3: [...data]
    }
    io?.emit('updateTeachers', teachers)
  })
}

export function setSubjectList () {
  getSubjectList().then((data) => {
    // console.log(data)
    subjects = [...data]
    io?.emit('updateSubjects', subjects)
  })
}

export default function setupSocket (server) {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  // Conexión WebSocket
  io.on('connection', (socket) => {
    console.log('Usuario conectado')

    // Enviar el array de profesores y asignaturas al cliente
    socket.emit('updateTeachers', teachers)
    socket.emit('updateSubjects', subjects)

    // Escuchar eventos de actualización de profesores
    socket.on('updateTeachers', (newTeachers) => {
      const validName = validateTeacherData(newTeachers)
      if (validName.error) {
        console.log(validName.error.message)
        return
      }
      teachers = newTeachers
      io.emit('updateTeachers', teachers)
    })

    // Escuchar eventos de actualización de asignaturas
    socket.on('updateSubjects', (newSubjects) => {
      const validName = validateSubjectData(newSubjects)
      if (validName.error) {
        console.log(validName.error.message)
        return
      }
      subjects = newSubjects
      io.emit('updateSubjects', subjects)
    })
  })

  return io
}

setTeacherList()
setSubjectList()
