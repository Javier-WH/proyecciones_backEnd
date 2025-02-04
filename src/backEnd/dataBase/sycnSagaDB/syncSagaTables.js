import sycnSagaSubjects from './sycnSagaSubjects.js'
import sycnSagaProgramas from './sycnSagaProgramas.js'
import syncSagaUcs from './syncSagaUcs.js'
import sycnSagaTrayectos from './syncSagaTrayectos.js'
import sycnSagaTurnos from './syncSagaTurnos.js'
import sycnSagaTeachers from './syncSagaTeachers.js'
import Gender from '#models/gender.js'
import Contracts from '#models/contractType.js'

export default async function syncSagaTables () {
  await sycnSagaTrayectos()
  await sycnSagaSubjects()
  await sycnSagaProgramas()
  await sycnSagaTurnos()
  await syncSagaUcs() // pensum
  await generateGenderData() // mock data
  await generateContractsData() // mock data
  await sycnSagaTeachers()
}

async function generateGenderData () {
  try {
    const genders = await Gender.findAll()
    if (genders.length !== 0) return
    await Gender.bulkCreate([{ id: 1, name: 'Masculino' }, { id: 2, name: 'Femenino' }])
  } catch (error) {
    console.log(error)
  }
}

async function generateContractsData () {
  try {
    const contacts = await Contracts.findAll()
    if (contacts.length !== 0) return
    await Contracts.bulkCreate([
      { id: crypto.randomUUID(), contractType: 'Tiempo Completo', hours: '16' },
      { id: crypto.randomUUID(), contractType: 'Medio Tiempo', hours: '12' },
      { id: crypto.randomUUID(), contractType: 'Dedicación Exclusiva', hours: '18' },
      { id: crypto.randomUUID(), contractType: 'Contratado', hours: '6' }
    ]
    )
  } catch (error) {
    console.log(error)
  }
}
