import { Server } from 'socket.io';
import { teachersList } from '../../dev/placeHolderData.js';
import { subjectsList } from '../../dev/placeHolderSubjects.js';
import  validateTeacherData  from '../utils/validateTeacherData.js';

 const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Array de profesores
  let teachers = {
    q1: [...teachersList],
    q2: [...teachersList],
    q3: [...teachersList],
  };

  //array de asignaturas
  let subjects = [...subjectsList];

  // Conexión WebSocket
  io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Enviar el array de profesores y asignaturas al cliente
    socket.emit('updateTeachers', teachers);
    socket.emit('updateSubjects', subjects);

    // Escuchar eventos de actualización de profesores
    socket.on('updateTeachers', (newTeachers) => {
      const validName = validateTeacherData(newTeachers);
      if (validName.error) {
        console.log(validName.error.message);
        return;
      }
      teachers = newTeachers;
      io.emit('updateTeachers', teachers);
    });

    // Escuchar eventos de actualización de asignaturas
    socket.on('updateSubjects', (newSubjects) => {
      /*const validName = validateTeacherData(newSubjects);
      if (validName.error) {
        console.log(validName.error.message);
        return;
      }*/
      subjects = newSubjects;
      io.emit('updateSubjects', subjects);
    });
  });

  return io;
};

export default setupSocket;