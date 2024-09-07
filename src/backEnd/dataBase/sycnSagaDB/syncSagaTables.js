import sycnSagaSubjects from './sycnSagaSubjects.js'
import sycnSagaProgramas from './sycnSagaProgramas.js'
import syncSagaUcs from './syncSagaUcs.js'
import sycnSagaTrayectos from './syncSagaTrayectos.js'
import sycnSagaTurnos from './syncSagaTurnos.js'

export default async function syncSagaTables () {
  await sycnSagaTrayectos()
  await sycnSagaSubjects()
  await sycnSagaProgramas()
  await sycnSagaTurnos()
  await syncSagaUcs() // pensum
}
