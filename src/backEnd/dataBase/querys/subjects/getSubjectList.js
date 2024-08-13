import Subjects from '../../models/subjects.js'
import Pensums from '../../models/pensum.js'
import Pnfs from '../../models/pnf.js'
import { Sequelize } from 'sequelize'

export default async function getSubjectList () {
  const result = await Pensums.findAll({
    attributes: [
      ['subject_id', 'id'],
      [Sequelize.col('subject.name'), 'subject'],
      'hours',
      [Sequelize.col('pnf.name'), 'pnf'],
      'quarter'

    ],
    include: [
      {
        model: Pnfs,
        attributes: [],
        as: 'pnf'
      },
      {
        model: Subjects,
        attributes: [],
        as: 'subject'
      }
    ],
    raw: true
  })

  const subjectList = result.map(subject => {
    subject.seccion = '1'
    subject.quarter = JSON.parse(subject.quarter)
    subject.hours = parseInt(subject.hours)
    return subject
  })

  return subjectList
}
