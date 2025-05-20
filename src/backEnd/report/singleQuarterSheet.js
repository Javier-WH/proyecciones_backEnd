/* eslint-disable no-unused-vars */
import { getTeacherHous } from "./utils.js";
export default function generateSingleQuarterSheet({
  sheetNumber,
  workbook,
  pnfArray,
  proyectionDate,
  contracts,
}) {
  let pageNumber = Number.parseInt(sheetNumber);

  for (const pnf of pnfArray) {
    for (let quarter = 1; quarter <= 3; quarter++) {
      const teachers = groupSubjectsByTeacher(pnf, quarter);
      const sheetName = `${pnf[0].pnf} T-${quarter}`
        .replace("P.N.F. en ", "")
        .replace("P.N.F en ", "")
        .toUpperCase();
      const sheet = workbook.addSheet(sheetName);

      let row = 1;
      // encabezado

      const rangeLine1 = sheet.range(`A${row}:I${row}`);
      sheet.cell(`A${row}`).value("PERSONAL DOCENTE");
      rangeLine1.merged(true);
      rangeLine1.style("horizontalAlignment", "center");
      rangeLine1.style("verticalAlignment", "center");
      row++;

      const rangeLine2 = sheet.range(`A${row}:I${row}`);
      sheet.cell(`A${row}`).value(`${pnf[0].pnf}`.toUpperCase());
      rangeLine2.merged(true);
      rangeLine2.style("horizontalAlignment", "center");
      rangeLine2.style("verticalAlignment", "center");
      row++;

      const rangeLine3 = sheet.range(`A${row}:I${row}`);
      sheet.cell(`A${row}`).value("U.P.T. DE LOS LLANOS JUANA RAMIREZ, EXTENSIÓN ALTAGRACIA DE ORITUCO");
      rangeLine3.merged(true);
      rangeLine3.style("horizontalAlignment", "center");
      rangeLine3.style("verticalAlignment", "center");
      row++;

      const rangeLine4 = sheet.range(`A${row}:I${row}`);
      sheet.cell(`A${row}`).value(`CARGA ACADÉMICA ${getQuaterName(quarter)}`);
      rangeLine4.merged(true);
      rangeLine4.style("horizontalAlignment", "center");
      rangeLine4.style("verticalAlignment", "center");
      row++;

      const rangeLine5 = sheet.range(`A${row}:I${row}`);
      sheet.cell(`A${row}`).value(proyectionDate);
      rangeLine5.merged(true);
      rangeLine5.style("horizontalAlignment", "center");
      rangeLine5.style("verticalAlignment", "center");
      row++;
      row++;

      // encabezado de la tabla
      const boldHeaderRange = sheet.range(`A${row}:I${row + 1}`);
      boldHeaderRange.style("bold", true);

      const rangeLine6A = sheet.range(`A${row}:A${row + 1}`);
      sheet.cell(`A${row}`).value("Profesor");
      rangeLine6A.merged(true);
      rangeLine6A.style("horizontalAlignment", "center");
      rangeLine6A.style("verticalAlignment", "center");
      rangeLine6A.style("border", true);

      const rangeLine6B = sheet.range(`B${row}:B${row + 1}`);
      sheet.cell(`B${row}`).value("Unidad Curricular");
      rangeLine6B.merged(true);
      rangeLine6B.style("horizontalAlignment", "center");
      rangeLine6B.style("verticalAlignment", "center");
      rangeLine6B.style("border", true);

      const rangeLine6C = sheet.range(`C${row}:C${row + 1}`);
      sheet.cell(`C${row}`).value("Trayecto");
      rangeLine6C.merged(true);
      rangeLine6C.style("horizontalAlignment", "center");
      rangeLine6C.style("verticalAlignment", "center");
      rangeLine6C.style("border", true);

      const rangeLine6D = sheet.range(`D${row}:D${row + 1}`);
      sheet.cell(`D${row}`).value("Sección");
      rangeLine6D.merged(true);
      rangeLine6D.style("horizontalAlignment", "center");
      rangeLine6D.style("verticalAlignment", "center");
      rangeLine6D.style("border", true);

      const rangeLine6E = sheet.range(`E${row}:E${row + 1}`);
      sheet.cell(`E${row}`).value("Turno");
      rangeLine6E.merged(true);
      rangeLine6E.style("horizontalAlignment", "center");
      rangeLine6E.style("verticalAlignment", "center");
      rangeLine6E.style("border", true);

      const rangeLine6FG = sheet.range(`F${row}:G${row}`);
      sheet.cell(`F${row}`).value(getQuaterName(quarter));
      rangeLine6FG.merged(true);
      rangeLine6FG.style("horizontalAlignment", "center");
      rangeLine6FG.style("verticalAlignment", "center");
      rangeLine6FG.style("border", true);

      sheet.cell(`F${row + 1}`).value("Horas por U/C");
      sheet.cell(`F${row + 1}`).style("horizontalAlignment", "center");
      sheet.cell(`F${row + 1}`).style("verticalAlignment", "center");
      sheet.cell(`F${row + 1}`).style("border", true);
      sheet.cell(`F${row + 1}`).style("wrapText", true);

      sheet.cell(`G${row + 1}`).value("Total de Horas");
      sheet.cell(`G${row + 1}`).style("horizontalAlignment", "center");
      sheet.cell(`G${row + 1}`).style("verticalAlignment", "center");
      sheet.cell(`G${row + 1}`).style("border", true);
      sheet.cell(`G${row + 1}`).style("wrapText", true);

      const rangeLine6H = sheet.range(`H${row}:H${row + 1}`);
      sheet.cell(`H${row}`).value("Dedicación");
      rangeLine6H.merged(true);
      rangeLine6H.style("horizontalAlignment", "center");
      rangeLine6H.style("verticalAlignment", "center");
      rangeLine6H.style("border", true);

      const rangeLine6I = sheet.range(`I${row}:I${row + 1}`);
      sheet.cell(`I${row}`).value("Observación");
      rangeLine6I.merged(true);
      rangeLine6I.style("horizontalAlignment", "center");
      rangeLine6I.style("verticalAlignment", "center");
      rangeLine6I.style("border", true);

      row++;
      row++;

      // datos de la tabla
      for (const [teacherIndex, teacher] of teachers.entries()) {
        if (teacher.load.length === 0) continue;
        const teacherHours = getTeacherHous(teacher.load, teacher.id);

        sheet.cell(`A${row}`).value(`${teacher.last_name} ${teacher.name}`.toUpperCase());
        sheet.cell(`A${row}`).style("wrapText", true);
        const initRange = row;
        for (const [subjectIndex, subject] of teacher.load.entries()) {
          const UCHours = subject.hours.q1
            ? subject.hours.q1
            : subject.hours.q2
            ? subject.hours.q2
            : subject.hours.q3;

          const teacherContractType =
            contracts.find((contract) => contract.id === teacher.contractTypes_id)?.contractType ||
            "Sin contrato";

          // console.log(subject);
          sheet.cell(`B${row}`).value(subject.subject);
          sheet.cell(`C${row}`).value(subject.trayectoName);
          sheet.cell(`C${row}`).style("horizontalAlignment", "center");
          sheet.cell(`D${row}`).value(`${subject.turnoName[0]}-0${subject.seccion}`);
          sheet.cell(`E${row}`).value(subject.turnoName);
          sheet.cell(`F${row}`).value(UCHours);
          sheet.cell(`F${row}`).style("horizontalAlignment", "center");
          subjectIndex === 0 && sheet.cell(`G${row}`).value(teacherHours[`q${quarter}`]);
          sheet.cell(`G${row}`).style("horizontalAlignment", "center");
          sheet.cell(`H${row}`).value(teacherContractType);
          sheet.row(row).height(25);
          sheet.row(row).style("verticalAlignment", "center");
          row++;
        }
        const teacherCellRange = sheet.range(`A${initRange}:A${initRange + teacher.load.length - 1}`);
        teacher.load.length > 1 && teacherCellRange.merged(true);
        // teacherCellRange.style("horizontalAlignment", "center");
        teacherCellRange.style("verticalAlignment", "center");

        const totalHourCellRange = sheet.range(`G${initRange}:G${initRange + teacher.load.length - 1}`);
        teacher.load.length > 1 && totalHourCellRange.merged(true);
        totalHourCellRange.style("horizontalAlignment", "center");
        totalHourCellRange.style("verticalAlignment", "center");

        const dedicationCellRange = sheet.range(`H${initRange}:H${initRange + teacher.load.length - 1}`);
        teacher.load.length > 1 && dedicationCellRange.merged(true);
        dedicationCellRange.style("horizontalAlignment", "center");
        dedicationCellRange.style("verticalAlignment", "center");

        const observationCellRange = sheet.range(`I${initRange}:I${initRange + teacher.load.length - 1}`);
        teacher.load.length > 1 && observationCellRange.merged(true);
        observationCellRange.style("horizontalAlignment", "center");
        observationCellRange.style("verticalAlignment", "center");

        sheet.range(`A${initRange}:I${row - 1}`).style("border", true);
      }
      // ajustar el ancho de las columnas
      sheet.column("A").width(50);
      sheet.column("B").width(50);
      sheet.column("C").width(18);
      sheet.column("H").width(25);
      sheet.column("I").width(18);

      // ajustar el alto a filas extra
      for (let i = 0; i < 50; i++) {
        sheet.row(row).height(25);
        row++;
      }
      pageNumber++;
    }
  }

  if (workbook.sheets().length > 1) {
    workbook.deleteSheet(0);
  }
  return {
    sheetNumber: pageNumber,
    workbook,
  };
}

function getQuaterName(number) {
  switch (number) {
    case 1:
      return "TRIMESTRE I";
    case 2:
      return "TRIMESTRE II";
    case 3:
      return "TRIMESTRE III";
    default:
      return "DESCONOCIDO";
  }
}

function groupSubjectsByTeacher(subjects, quarter) {
  const teachersMap = {};

  subjects.forEach((subject) => {
    const teacherData = subject.teacherData;

    if (teacherData) {
      const teacherId = teacherData.id;

      // Si el profesor no está en el mapa, agregarlo
      if (!teachersMap[teacherId]) {
        // Copiar los datos del profesor y agregar un array de carga vacío
        teachersMap[teacherId] = {
          ...teacherData,
          load: [],
        };
      }

      // Agregar la materia a la carga del profesor, excluyendo la data del profesor para evitar recursión/anidamiento excesivo
      const subjectWithoutTeacherData = { ...subject };
      delete subjectWithoutTeacherData.teacherData;
      // console.log(subject);
      teachersMap[teacherId].load.push(subjectWithoutTeacherData);
    }
  });

  // Convertir el mapa de profesores a un array
  const teachersArray = Object.values(teachersMap);

  // elimina las materias duplicadas
  const cleanTeachersArray = teachersArray.map((teacher) => {
    teacher.load = teacher.load.filter((item, index, self) => {
      const isDuplicate = self.findIndex((obj) => obj.innerId === item.innerId) < index;
      return !isDuplicate;
    });
    return teacher;
  });

  // filtra las materias solo del trimestre seleccionado
  const filteredSubjectsByQuarter = cleanTeachersArray.map((profesor) => {
    const load = profesor.load;
    const filteredLoad = load.filter((subject) => subject.quarter?.[`q${quarter}`] === profesor.id);
    profesor.load = filteredLoad;
    return profesor;
  });

  return Object.values(filteredSubjectsByQuarter);
}

