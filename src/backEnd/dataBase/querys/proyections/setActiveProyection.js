/* eslint-disable camelcase */
import config from '#models/config.js'

export default async function getActiveProyection (req, res) {
  const { active_proyection } = req.body
  if (!active_proyection) {
    return res.status(400).json({ error: 'no ha suministrado un id' })
  }

  try {
    const proyection = await config.update({ active_proyection }, { where: { id: 1 } })
    res.json(proyection)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al intentar actualizar la proyeccion' })
  }
}
