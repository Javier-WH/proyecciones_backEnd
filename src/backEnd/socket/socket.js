import { Server } from "socket.io";
// import validateTeacherData from '#utils/validateTeacherData.js'
import validateSubjectData from "#utils/validateSubject.js";
import getTeacherList from "#querys/teachers/getTeacherList.js";
import { getTeacherData, checkIfProyectionExists } from "./socketUtils.js";
import { updateProyection } from "../dataBase/create/updateProyection.js";
import Config from "#models/config.js";

let io = null;

let currentProyectionId = "";

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

// Nombre de la proyección
let proyectionName = "desconocido";
let proyectionId = null;

// Verificar si hay una proyeccion activa
const loadProyection = async () => {
  // se obtiene el id de la proyeccion activa
  const requestConfigData = await Config.findOne({ where: { id: 1 }, raw: true });
  if (requestConfigData?.active_proyection) {
    currentProyectionId = requestConfigData?.active_proyection;
  }

  // se obtienen los datos de la proyeccion activa
  const request = await checkIfProyectionExists(currentProyectionId);
  if (request.error) {
    console.log(request.message);
    setTeacherList();
    return;
  }
  proyectionName = request.data.name;
  proyectionId = request.data.id;
  const proyeccion = request.data;

  if (proyeccion?.teachers) {
    if (proyeccion?.teachers === '{ "q1": [], "q2": [], "q3": [] }') {
      console.log("sin profesores en la proyeccion");
      await setTeacherList();
    } else {
      console.log("profesores en la proyeccion");
      teachers = await JSON.parse(proyeccion.teachers);
    }
  }
  if (proyeccion?.subjects) {
    subjects = await JSON.parse(proyeccion.subjects);
  }
  if (proyeccion?.proyections_done) {
    proyectionsDone = await JSON.parse(proyeccion.proyections_done);
  }
};

export async function setTeacherList() {
  const teacherList = await getTeacherList();

  teachers = {
    q1: [...teacherList],
    q2: [...teacherList],
    q3: [...teacherList],
  };
  io?.emit("updateTeachers", teachers);
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
    socket.emit("proyectionData", { proyectionName, proyectionId });

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
            teacher.name = teacherData.name;
            teacher.last_name = teacherData.last_name;
            teacher.ci = teacherData.ci;
            teacher.gender_id = teacherData.gender_id;
            teacher.gender = teacherData.gender;
            teacher.contractTypes_id = teacherData.contractTypes_id;
            teacher.type = teacherData.type;
            teacher.partTime = teacherData.partTime;
            teacher.title = teacherData.title;
            teacher.perfil_name_id = teacherData.perfil_name_id;
            teacher.perfilName = teacherData.perfilName;
            teacher.active = teacherData.active;
          }
          return teacher;
        });
      });

      io.emit("updateTeachers", teachers);
    });

    // Escuchar eventos de actualización de asignaturas
    socket.on("updateSubjects", (newSubjects) => {
      /*const validName = validateSubjectData(newSubjects);
      if (validName.error) {
        console.log(validName.error);
        return;
      }*/
      subjects = newSubjects;
      io.emit("updateSubjects", subjects);
    });

    // Escuchar eventos de actualización de proyecciones
    socket.on("proyectionsDone", (newProyections) => {
      proyectionsDone = newProyections;
      io.emit("proyectionsDone", proyectionsDone);
    });

    socket.on("reload", () => {
      loadProyection().then(() => {
        socket.emit("updateTeachers", teachers);
        socket.emit("updateSubjects", subjects);
        socket.emit("proyectionsDone", proyectionsDone);
        socket.emit("proyectionData", { proyectionName, proyectionId });
      });
    });

    // Escuchar eventos de error
    socket.on("error", (error) => {
      console.log(error);
    });
  });

  return io;
}

loadProyection();

