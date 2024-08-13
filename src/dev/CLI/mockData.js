import { Op } from 'sequelize'
import Contracts from '../../backEnd/dataBase/models/contractType.js'
import Pnf from '../../backEnd/dataBase/models/pnf.js'
import Subject from '../../backEnd/dataBase/models/subjects.js'
import PerfilNames from '../../backEnd/dataBase/models/perfilNames.js'

async function generateContractsData () {
  const contract = [
    { id: crypto.randomUUID(), contractType: 'Tiempo Completo', hours: '16' },
    { id: crypto.randomUUID(), contractType: 'Medio Tiempo', hours: '12' },
    { id: crypto.randomUUID(), contractType: 'Dedicación Exclusiva', hours: '18' },
    { id: crypto.randomUUID(), contractType: 'Contratado', hours: '6' }
  ]

  try {
    await Contracts.destroy({ where: { id: { [Op.ne]: null } } })
    await Contracts.bulkCreate(contract)
    console.log('Tipos de contratos creados')
  } catch (error) {
    console.log(error)
  }
}

async function generatePnfData () {
  const pnf = [
    { id: crypto.randomUUID(), name: 'Informática' },
    { id: crypto.randomUUID(), name: 'Administración' },
    { id: crypto.randomUUID(), name: 'Agroalimentación' },
    { id: crypto.randomUUID(), name: 'Medicina Veterinaria' }
  ]

  try {
    await Pnf.destroy({ where: { id: { [Op.ne]: null } } })
    await Pnf.bulkCreate(pnf)
    console.log('Pnfs creados')
  } catch (error) {
    console.log(error)
  }
}

async function generateSubjectsData () {
  const subject = [
    { id: crypto.randomUUID(), name: 'Matematicas' },
    { id: crypto.randomUUID(), name: 'Tecnologías de la Información' },
    { id: crypto.randomUUID(), name: 'Arquitectura del computador' },
    { id: crypto.randomUUID(), name: 'Ingles' },
    { id: crypto.randomUUID(), name: 'Electronica' },
    { id: crypto.randomUUID(), name: 'Electiva' },
    { id: crypto.randomUUID(), name: 'FrameWork' },
    { id: crypto.randomUUID(), name: 'Programación' },
    { id: crypto.randomUUID(), name: 'Proyecto Sociotecnico' },
    { id: crypto.randomUUID(), name: 'Sistemas Operativos' }

  ]

  try {
    await Subject.destroy({ where: { id: { [Op.ne]: null } } })
    await Subject.bulkCreate(subject)
    console.log('Materias creadas')
  } catch (error) {
    console.log(error)
  }
}

async function generatePerfilsData () {
  const perfil = [
    { id: crypto.randomUUID(), name: 'Ingeniero en Sistemas' },
    { id: crypto.randomUUID(), name: 'Economista' },
    { id: crypto.randomUUID(), name: 'Medico Veterinario' }
  ]

  try {
    await PerfilNames.destroy({ where: { id: { [Op.ne]: null } } })
    await PerfilNames.bulkCreate(perfil)
    console.log('Perfiles creados')
  } catch (error) {
    console.log(error)
  }
}

async function mockData () {
  await generateContractsData()
  await generatePnfData()
  await generateSubjectsData()
  await generatePerfilsData()
}

mockData()
