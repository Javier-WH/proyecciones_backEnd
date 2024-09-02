import fethInscriptionAPI from '#fetch/fetchInscriptionAPI.js'
import { groupedByProgram } from '#utils/proyeccionUtils.js'

export default async function getInscriptionData () {
  const minAprobationGrade = 10

  const data = await fethInscriptionAPI()
  if (!data) {
    return {
      error: true,
      message: 'No se han podido cargar las proyecciones'
    }
  }

  // filtrar los reprobados
  const fails = []
  const passed = []

  for (const student of data) {
    if (student.grade < minAprobationGrade) {
      fails.push(student)
    } else {
      passed.push(student)
    }
  }

  const failsGroupedByProgram = groupedByProgram(fails)
  const passedGroupedByProgram = groupedByProgram(passed)

  const response = {
    error: false,
    message: null,
    inscriptionData: {
      total: data.length,
      totalFails: fails.length,
      totalPassed: passed.length,
      minAprobationGrade,
      fails: failsGroupedByProgram,
      passed: passedGroupedByProgram
    }
  }

  return response
}
