import Profile from '#models/perfil.js'
import ProfileNames from '#models/perfilNames.js'
import Subjects from '#models/subjects.js'
import { Sequelize } from 'sequelize'

async function getProfile (active = 1) {
  const result = await Profile.findAll({
    attributes: [
      'id',
      'perfil_name_id',
      'subject_id',
      [Sequelize.col('perfil_name.name'), 'perfil_name'],
      [Sequelize.col('subject.name'), 'subject_name']
    ],
    raw: true,
    nest: true,
    include: [
      {
        model: ProfileNames,
        attributes: [],
        as: 'perfil_name'
      },
      {
        model: Subjects,
        attributes: [],
        as: 'subject'
      }
    ]
  })
  return result
}
export default getProfile
