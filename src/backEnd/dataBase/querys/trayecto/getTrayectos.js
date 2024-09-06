import Trayectos from '#models/trayecto.js'

export async function getTrayectos () {
  return await Trayectos.findAll({ raw: true })
}
