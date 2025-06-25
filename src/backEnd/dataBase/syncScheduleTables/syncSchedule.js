import Days from "#models/schedule/days.js";
import Classrooms from "#models/schedule/classrooms.js";
import Hours from "#models/schedule/hours.js";

const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

async function syncDaysTable() {
  try {
    const days = await Days.findAll({ raw: true });
    if (days.length === 0) {
      const initialDays = [
        { day: "Lunes", index: 1 },
        { day: "Martes", index: 2 },
        { day: "Miércoles", index: 3 },
        { day: "Jueves", index: 4 },
        { day: "Viernes", index: 5 },
        { day: "Sábado", index: 6 },
        { day: "Domingo", index: 7 },
      ];
      await Days.bulkCreate(initialDays);
      console.log("Días iniciales agregados a la tabla Days.");
    }
  } catch (error) {
    console.error("Error syncing Days tables:", error);
  }
}

async function syncClassroomsTable() {
  try {
    const classrooms = await Classrooms.findAll({ raw: true });
    if (classrooms.length === 0) {
      const initialClassrooms = [
        { classroom: "Aula 1" },
        { classroom: "Aula 2" },
        { classroom: "Aula 3" },
        { classroom: "Aula 4" },
        { classroom: "Aula 5" },
        { classroom: "Aula 6" },
        { classroom: "Aula 7" },
        { classroom: "Aula 8" },
        { classroom: "Aula 9" },
        { classroom: "Aula 10" },
        { classroom: "Aula 11" },
        { classroom: "Aula 12" },
        { classroom: "Aula 13" },
        { classroom: "Aula 14" },
        { classroom: "Laboratorio Informática 1" },
        { classroom: "Laboratorio Informática 2" },
        { classroom: "Laboratorio Informática 3" },
      ];
      await Classrooms.bulkCreate(initialClassrooms);
      console.log("Aulas iniciales agregadas a la tabla Classrooms.");
    }
  } catch (error) {
    console.error("Error syncing Classrooms tables:", error);
  }
}

async function syncHoursTable() {
  try {
    const stepMinutes = 45; // Duración de cada franja horaria en minutos
    const initialStartTime = "07:00"; // Hora de inicio de la primera franja
    const totalSlots = 24; // Número total de franjas horarias a generar

    const hoursInDb = await Hours.findAll({ raw: true });

    if (hoursInDb.length === 0) {
      const generatedHours = [];
      let currentIndex = 1;

      // Parsear la hora de inicio inicial
      let [startHour, startMinute] = initialStartTime.split(":").map(Number);
      let currentTime = new Date();
      currentTime.setHours(startHour, startMinute, 0, 0); // Establecer la hora inicial sin afectar la fecha

      for (let i = 0; i < totalSlots; i++) {
        const startTime = new Date(currentTime); // Clonar para la hora de inicio de la franja actual

        // Calcular la hora de fin sumando stepMinutes
        currentTime.setMinutes(currentTime.getMinutes() + stepMinutes);
        const endTime = new Date(currentTime); // Clonar para la hora de fin de la franja actual

        const hoursString = `${formatTime(startTime)} - ${formatTime(endTime)}`;

        generatedHours.push({
          index: currentIndex++,
          hours: hoursString,
        });
      }

      await Hours.bulkCreate(generatedHours);
      console.log("Horas generadas y agregadas a la tabla Hours");
      return true;
    }
  } catch (error) {
    console.error("Error sincronizando la tabla Hours:", error);
    return false;
  }
}

/**
 * Actualiza la tabla Hours con nuevas franjas horarias.
 *
 * Este método:
 * 1. Genera las nuevas franjas horarias con la configuración dada.
 * 2. Actualiza los registros existentes si son diferentes.
 * 3. Crea nuevos registros si no existen.
 * 4. Elimina registros sobrantes.
 *
 * @param {number} stepMinutes - La cantidad de minutos que separan cada franja horaria.
 * @param {string} initialStartTime - La hora de inicio en formato HH:MM.
 * @param {number} totalSlots - La cantidad de franjas horarias a generar.
 *
 * @returns {Promise<boolean>} - 'true' si se realizaron cambios en la tabla, 'false' si no hubo cambios.
 */
export async function updateHoursTable(stepMinutes, initialStartTime, totalSlots) {
  try {
    const existingHours = await Hours.findAll({
      raw: true,
      order: [["index", "ASC"]],
    });

    const generatedHours = [];
    let currentTime = new Date();
    const [startHour, startMinute] = initialStartTime.split(":").map(Number);
    currentTime.setHours(startHour, startMinute, 0, 0); // Establecer la hora inicial sin afectar la fecha

    // 1. Generar las nuevas franjas horarias
    for (let i = 0; i < totalSlots; i++) {
      const startTime = new Date(currentTime);
      currentTime.setMinutes(currentTime.getMinutes() + stepMinutes);
      const endTime = new Date(currentTime);

      generatedHours.push({
        index: i + 1, // El index siempre debe ser secuencial empezando en 1
        hours: `${formatTime(startTime)} - ${formatTime(endTime)}`,
      });
    }

    const updates = [];
    const creates = [];
    const existingIdsToKeep = new Set();

    // 2. Actualizar registros existentes y preparar nuevos para creación
    for (let i = 0; i < totalSlots; i++) {
      const newHourData = generatedHours[i];
      const existingHour = existingHours.find((h) => h.index === newHourData.index);

      if (existingHour) {
        // Si el registro existe y es diferente, prepáralo para actualización
        if (existingHour.hours !== newHourData.hours) {
          updates.push({
            id: existingHour.id, // Mantener el ID existente
            index: newHourData.index,
            hours: newHourData.hours,
          });
        }
        existingIdsToKeep.add(existingHour.id);
      } else {
        // Si no existe, prepáralo para creación
        creates.push(newHourData);
      }
    }

    // 3. Eliminar registros sobrantes
    const idsToDelete = existingHours
      .filter((hour) => !existingIdsToKeep.has(hour.id))
      .map((hour) => hour.id);

    // Ejecutar operaciones en la base de datos
    if (updates.length > 0) {
      // Usar un bucle para actualizar individualmente y no perder los IDs
      for (const updateData of updates) {
        await Hours.update(
          { index: updateData.index, hours: updateData.hours },
          { where: { id: updateData.id } }
        );
      }
      console.log(`Se actualizaron ${updates.length} registros de horas.`);
    }

    if (creates.length > 0) {
      await Hours.bulkCreate(creates);
      console.log(`Se crearon ${creates.length} nuevos registros de horas.`);
    }

    if (idsToDelete.length > 0) {
      await Hours.destroy({
        where: {
          id: idsToDelete,
        },
      });
      console.log(`Se eliminaron ${idsToDelete.length} registros de horas extra.`);
    }

    if (updates.length === 0 && creates.length === 0 && idsToDelete.length === 0) {
      console.log("La tabla de horas ya está actualizada, no se requieren cambios.");
    }
  } catch (error) {
    console.error("Error actualizando la tabla Hours:", error);
  }
}

export default function syncSchedule() {
  syncDaysTable();
  syncClassroomsTable();
  syncHoursTable();
  updateHoursTable(45, "07:00", 24);
}

