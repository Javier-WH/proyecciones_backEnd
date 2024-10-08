// este archivo es para sincronizar la tabla Pensum con la tabla Ucs de SAGA
import fethSubjectAPI from '#fetch/fethSubjectsAPI.js'
import Pensum from '#models/pensum.js'
import Pnf from '#models/pnf.js'
import Subjects from '#models/subjects.js'
import Trayecto from '#models/trayecto.js'

export default async function syncSagaUcs () {
  const sagaSubjects = await fethSubjectAPI()

  // console.log(sagaSubjects)
  // return

  if (sagaSubjects === null) {
    console.log('No se han podido sincronizar el pensum')
    return
  }

  const pensumItems = []
  for (const item of sagaSubjects) {
    const trayectoSagaId = item.trayecto_info.id
    const trayecto = await Trayecto.findOne({
      where: { saga_id: trayectoSagaId },
      raw: true
    })
    const trayectoId = trayecto?.id

    const pnf = await Pnf.findOne({
      where: { saga_id: item.programa_info.id },
      raw: true
    })
    const subject = await Subjects.findOne({
      where: { name: item?.description?.trim() },
      raw: true
    })

    // console.log(subject)
    let hours = item?.hours?.htea
    if (!hours) hours = null // si las horas son undefinded, null o 0, se pone como null

    pensumItems.push({
      id: crypto.randomUUID(),
      pnf_id: pnf?.id ?? null,
      subject_id: subject?.id ?? null,
      trayecto_id: trayectoId,
      hours,
      quarter: '[1, 2]'
    })
  }

  try {
    await Pensum.bulkCreate(pensumItems, {
      fields: ['id', 'pnf_id', 'subject_id', 'trayecto_id', 'hours', 'quarter'],
      updateOnDuplicate: ['hours', 'quarter'],
      ignoreDuplicates: true
    })
    console.log('Pensum sincronizado')
  } catch (error) {
    console.log(error)
  }
}
