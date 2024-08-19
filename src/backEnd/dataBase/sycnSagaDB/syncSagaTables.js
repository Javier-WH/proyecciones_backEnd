import sycnSagaSubjects from './sycnSagaSubjects.js'
import sycnSagaProgramas from './sycnSagaProgramas.js'
import syncSagaUcs from './syncSagaUcs.js'

export default async function syncSagaTables () {
  await sycnSagaSubjects()
  await sycnSagaProgramas()
  await syncSagaUcs() // pensum
}
