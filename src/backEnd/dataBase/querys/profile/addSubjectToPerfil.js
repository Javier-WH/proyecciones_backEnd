/* eslint-disable camelcase */
import Perfil from '#models/perfil.js'
import { v4 as uuidv4 } from 'uuid'

export default async function addSubjectToProfile (req, res) {
  const { perfil_name_id, subject_id } = req.body

  if (!perfil_name_id || !subject_id) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  try {
    const id = uuidv4()
    await Perfil.create({ id, perfil_name_id, subject_id })
    res.status(201).json({ message: 'Perfil creado exitosamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el perfil' })
  }
}
