import Pnfs from "#models/pnf.js";
import Trayectos from "#models/trayecto.js";
import fethSubjectAPI from "#fetch/fethSubjectsAPI.js";

export async function getSimpleSubjectList({ pnfId, trayectoId, mayaId } = {}) {
  try {
    if (!pnfId || !trayectoId || mayaId === undefined || mayaId === null) {
      throw new Error("Se requieren pnfId, trayectoId y mayaId");
    }

    // Resolver saga ids si se pasaron IDs locales (UUIDs)
    let sagaPnfId = pnfId;
    let sagaTrayectoId = trayectoId;

    // si pnfId parece un UUID, buscar en la DB para obtener saga_id
    if (typeof pnfId === "string" && pnfId.includes("-")) {
      const pnf = await Pnfs.findOne({ where: { id: pnfId }, raw: true });
      if (!pnf) throw new Error("PNF no encontrado");
      sagaPnfId = pnf.saga_id;
    }

    if (typeof trayectoId === "string" && trayectoId.includes("-")) {
      const tray = await Trayectos.findOne({ where: { id: trayectoId }, raw: true });
      if (!tray) throw new Error("Trayecto no encontrado");
      sagaTrayectoId = tray.saga_id;
    }

    const resp = await fethSubjectAPI({
      pnfId: String(sagaPnfId || ""),
      trayectoId: String(sagaTrayectoId || ""),
      mayaId: String(mayaId),
    });
    if (!resp) return [];
    return Array.isArray(resp) ? resp : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

