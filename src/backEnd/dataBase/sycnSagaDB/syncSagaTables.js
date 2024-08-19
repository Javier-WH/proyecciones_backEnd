import sycnSagaSubjects from './sycnSagaSubjects.js'
import sycnSagaProgramas from './sycnSagaProgramas.js'

export default async function syncSagaTables () {
  await sycnSagaSubjects()
  await sycnSagaProgramas()
}
