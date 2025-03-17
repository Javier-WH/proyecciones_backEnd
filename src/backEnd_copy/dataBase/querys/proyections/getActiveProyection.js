import config from '#models/config.js'

export default async function getActiveProyection (req, res) {
  try {
    const proyection = await config.findOne({ where: { id: 1 } })
    res.json(proyection)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al intentar obtener la proyeccion activa' })
  }
}
