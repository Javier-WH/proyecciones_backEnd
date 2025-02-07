/* eslint-disable camelcase */
import Proyections from '#models/proyections.js'

export async function updateProyection ({ id, subjects, proyection, teachers, proyections_done }) {
  if (!id) return false
  if (!proyection && !teachers && !proyections_done) return false

  const params = {}
  if (subjects) params.subjects = subjects
  if (teachers) params.teachers = teachers
  if (proyections_done) params.proyections_done = proyections_done

  try {
    await Proyections.update(params, { where: { id } })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function getProyection (id) {
  if (!id) return false
  try {
    const proyection = await Proyections.findOne({ where: { id }, raw: true })
    return proyection
  } catch (error) {
    console.error(error)
    return false
  }
}
