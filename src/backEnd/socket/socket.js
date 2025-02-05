import { Server } from "socket.io";
import validateTeacherData from "#utils/validateTeacherData.js";
import validateSubjectData from "#utils/validateSubject.js";
import getTeacherList from "#querys/teachers/getTeacherList.js";
import getSubjectList from "#querys/subjects/getSubjectList.js";
import { getTeacherData } from "./socketUtils.js";
import { updateProyection } from "../dataBase/create/updateProyection.js";
const currentProyectionId = "0b4bb3dc-db19-4e1e-a412-a8fa3f2d8809";

let io = null;

// Array de profesores
let teachers = {
  q1: [],
  q2: [],
  q3: [],
};

// array de asignaturas
let subjects = [];

// array de proyecciones realizadas
let proyectionsDone = [];

export async function setTeacherList() {
  const teacherList = await getTeacherList();

  teachers = {
    q1: [...teacherList],
    q2: [...teacherList],
    q3: [...teacherList],
  };
  io?.emit("updateTeachers", teachers);
}

export function setSubjectList() {
  getSubjectList().then((data) => {
    // console.log(data)
    subjects = [...data];
    io?.emit("updateSubjects", subjects);
  });
}

export default function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  // Conexión WebSocket
  io.on("connection", (socket) => {
    console.log("Usuario conectado");

    // Enviar el array de profesores y asignaturas al cliente
    socket.emit("updateTeachers", teachers);
    socket.emit("updateSubjects", subjects);
    socket.emit("proyectionsDone", proyectionsDone);

    // Escuchar eventos de actualización de profesores
    socket.on("updateTeachers", (newTeachers) => {
      /* const validName = validateTeacherData(newTeachers)
      if (validName.error) {
        console.log(validName.error.message)
        return
      } */

      teachers = newTeachers;

      updateProyection({
        id: currentProyectionId,
        teachers: JSON.stringify(teachers),
        subjects: JSON.stringify(subjects),
        proyections_done: JSON.stringify(proyectionsDone),
      });

      io.emit("updateTeachers", teachers);
    });

    socket.on("updateTeacher", async (teacherData) => {
      teacherData = await getTeacherData(teacherData);

      const quarterList = Object.keys(teachers);
      quarterList.forEach((quarter) => {
        teachers[quarter] = teachers[quarter].map((teacher) => {
          if (teacher.id === teacherData.id) {
            teacher = teacherData;
          }
          return teacher;
        });
      });

      io.emit("updateTeachers", teachers);
    });

    // Escuchar eventos de actualización de asignaturas
    socket.on("updateSubjects", (newSubjects) => {
      const validName = validateSubjectData(newSubjects);
      if (validName.error) {
        console.log(validName.error);
        return;
      }
      subjects = newSubjects;
      io.emit("updateSubjects", subjects);
    });

    // Escuchar eventos de actualización de proyecciones
    socket.on("proyectionsDone", (newProyections) => {
      proyectionsDone = newProyections;
      io.emit("proyectionsDone", proyectionsDone);
    });

    // Escuchar eventos de error
    socket.on("error", (error) => {
      console.log(error);
    });
  });

  return io;
}

setTeacherList();
// setSubjectList()

