/* eslint-disable camelcase */
import Proyections from '#models/proyections.js'
import { v4 as uuidv4 } from 'uuid'

export default async function createProyection (req, res) {
  const { year, name } = req.body

  if (!year || !name) {
    return res.status(401).json({ error: 'Faltan campos requeridos' })
  }

  try {
    // se verifica si ya existe un year registrado
    const existingYear = await Proyections.findOne({ where: { year }, raw: true })

    let proyection = []
    let teachers = []
    let proyections_done = []
    if (existingYear.length > 0) {
      proyection = existingYear.proyection
      teachers = existingYear.teachers
      proyections_done = existingYear.proyections_done
    }

    // se crea la proyeccion
    const id = uuidv4()
    await Proyections.create({ id, year, name, proyection, teachers, proyections_done })
    res.status(201).json({ message: 'Proyeccion creada exitosamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la proyections' })
  }
}
