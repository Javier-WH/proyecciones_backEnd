import Subjects from '#models/subjects.js'
export async function getSimpleSubjectList () {
  return await Subjects.findAll({ raw: true })
}
