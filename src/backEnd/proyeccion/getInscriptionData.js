import fethInscriptionAPI from '#fetch/fetchInscriptionAPI.js'
import Pnf from '#models/pnf.js'

export default async function getInscriptionData (req, res) {
  const minAprobationGrade = 10
  const pnfId = req.params.pnf

  const pnfData = await Pnf.findOne({ where: { id: pnfId }, raw: true })
  if (!pnfData) {
    res.json({ error: true, message: 'No se encontro el pnf' })
    return
  }

  const { saga_id: sagaId, name: pnfName } = pnfData

  const data = await fethInscriptionAPI()
  if (!data) {
    res.json({ error: true, message: 'No se han podido cargar las proyecciones' })
    return
  }

  // filtrar por PNF
  const filterdByPnf = data.filter((item) => item.pnf_info.id === sagaId)

  // filtrar aprobados y reprobados
  const fails = []
  const passed = []

  for (const student of filterdByPnf) {
    if (student.grade < minAprobationGrade) {
      fails.push(student)
    } else {
      passed.push(student)
    }
  }

  // Agrupando por trayecto_id
  const groupedByTrayectoId = passed.reduce((acc, item) => {
    const trayectoId = `trayecto_${item.uc_info.trayecto_id}`
    if (!acc[trayectoId]) {
      acc[trayectoId] = []
    }
    acc[trayectoId].push(item)
    return acc
  }, {})

  // Eliminando duplicados por student_id
  Object.keys(groupedByTrayectoId).forEach((trayecto) => {
    groupedByTrayectoId[trayecto] = groupedByTrayectoId[trayecto].reduce((acc, current) => {
      const x = acc.find(item => item.student_id === current.student_id)
      if (!x) {
        acc.push(current)
      }
      return acc
    }, [])
  })

  // totales de estudiantes aprobados por trayecto
  const aprovedByTrayectoId = {}
  Object.keys(groupedByTrayectoId).forEach((trayecto) => {
    const total = groupedByTrayectoId[trayecto].length
    const keyName = `aproved_${trayecto}`
    if (!aprovedByTrayectoId[keyName]) {
      aprovedByTrayectoId[keyName] = 0
    }
    aprovedByTrayectoId[keyName] += total
  })

  const response = {
    error: false,
    message: null,
    data: {
      minAprobationGrade,
      pnfName,
      pnfId,
      pnfSagaId: sagaId,
      ...aprovedByTrayectoId,
      totalFails: fails.length,
      fails,
      passed: groupedByTrayectoId
    }
  }

  res.json(response)
}
