import Teacher from '#models/teachers.js'
import Genders from '#models/gender.js'
import ContractType from '#models/contractType.js'
import Perfil from '#models/perfil.js'
import PerfilNames from '#models/perfilNames.js'
import { Sequelize } from 'sequelize'

async function getTeacherList (active = 1) {
  const result = await Teacher.findAll({
    attributes: [
      'id',
      'name',
      ['last_name', 'lastName'],
      'ci',
      'title',
      'perfil_name_id',
      'active',
      [Sequelize.col('gender.name'), 'gender'],
      [Sequelize.col('gender.id'), 'genderId'],
      [Sequelize.col('contract_type.hours'), 'partTime'],
      [Sequelize.col('contract_type.contractType'), 'type'],
      [Sequelize.col('contract_type.id'), 'contractTypeId'],
      [Sequelize.col('perfil_name.name'), 'perfilName']

    ],
    include: [
      {
        model: Genders,
        attributes: [],
        as: 'gender'
      },
      {
        model: ContractType,
        attributes: [],
        as: 'contract_type'
      },
      {
        model: PerfilNames,
        attributes: [],
        as: 'perfil_name'
      }

    ],
    raw: true,
    nest: true
  })

  // se obtienen los perfiles de la base de datos
  const Perfils = await Perfil.findAll({ raw: true })

  // se filtran los perfiles de cada profesor
  const teacherList = result.map(teacher => {
    const perfilNameId = teacher.perfil_name_id
    const filterdedPerfils = Perfils.filter(perfil => {
      return perfil.perfil_name_id === perfilNameId
    })

    teacher.perfil = filterdedPerfils.map(perfil => perfil.subject_id)
    teacher.load = []
    teacher.photo = null
    // delete teacher.perfil_name_id
    return teacher
  })

  return teacherList
}

export default getTeacherList
