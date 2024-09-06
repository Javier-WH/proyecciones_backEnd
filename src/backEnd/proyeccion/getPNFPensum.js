import Pensum from '#models/pensum.js'
import Pnf from '#models/pnf.js'
export default async function getPNFPensum (req, res) {
  const pnfId = req.params.pnf

  const pnf = await Pnf.findOne({
    where: { id: pnfId },
    raw: true
  })
  if (!pnf) {
    res.json({ error: true, message: 'No se ha encontrado el pnf' })
    return
  }
  const pnfName = pnf.name

  const pensums = await Pensum.findAll({
    where: {
      pnf_id: pnfId
    },
    raw: true
  })
  if (pensums.length === 0) {
    res.json({ error: true, message: 'No se ha encontrado el pensum' })
    return
  }

  res.json(
    {
      error: false,
      message: null,
      data: {
        pnfName,
        pnfId,
        pensums
      }
    }
  )
}
