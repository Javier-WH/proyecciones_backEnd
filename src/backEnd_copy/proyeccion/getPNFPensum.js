import Pensum from '#models/pensum.js'
import Pnf from '#models/pnf.js'
import Trayecto from '#models/trayecto.js'
import Subject from '#models/subjects.js'

import { Sequelize } from 'sequelize'
export default async function getPNFPensum (req, res) {
  const { pnf: pnfId, trayecto: trayectoId } = req.params

  const pnf = await Pnf.findOne({
    where: { id: pnfId },
    raw: true
  })
  if (!pnf) {
    res.status(400).json({ error: true, message: 'No se ha encontrado el pnf' })
    return
  }
  const pnfName = pnf.name

  const trayectoData = await Trayecto.findOne({
    where: { id: trayectoId },
    raw: true
  })
  if (!trayectoData) {
    res.status(400).json({ error: true, message: 'No se ha encontrado el trayecto' })
    return
  }

  const trayectoName = trayectoData.name

  const pensums = await Pensum.findAll({
    where: {
      pnf_id: pnfId,
      trayecto_id: trayectoId,
      active: true
    },
    include: [
      {
        model: Subject,
        attributes: []
      },
      {
        model: Trayecto,
        attributes: [],
        as: 'trayecto'
      }
    ],
    attributes: [
      'id',
      'subject_id',
      'hours',
      'quarter',
      [Sequelize.col('subject.name'), 'subject'],
      [Sequelize.col('trayecto.saga_id'), 'trayecto_saga_id']
    ],
    raw: true
  })
  if (pensums.length === 0) {
    res.status(404).json({ error: true, message: 'No se ha encontrado el pensum' })
    return
  }

  res.status(200).json({
    error: false,
    message: null,
    data: {
      pnfName,
      pnfId,
      trayectoId,
      trayectoName,
      pensums
    }
  })
}
