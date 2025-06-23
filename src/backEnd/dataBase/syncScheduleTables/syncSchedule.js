import Days from "#models/schedule/days.js";

async function syncDaysTable() {
  try {
    const days = await Days.findAll({ raw: true });
    if (days.length === 0) {
      const initialDays = [
        { day: "Lunes" },
        { day: "Martes" },
        { day: "Miércoles" },
        { day: "Jueves" },
        { day: "Viernes" },
        { day: "Sábado" },
        { day: "Domingo" },
      ];
      await Days.bulkCreate(initialDays);
      console.log("Días iniciales agregados a la tabla Days.");
    }
  } catch (error) {
    console.error("Error syncing Days tables:", error);
  }
}

export default function syncSchedule() {
  syncDaysTable();
}

