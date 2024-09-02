import PerfilNames from '#models/perfilNames.js'
import Subjects from '#models/subjects.js'
import Perfil from '#models/perfil.js'
import Pnf from '#models/pnf.js'
import Pensum from '#models/pensum.js'
import ContractType from '#models/contractType.js'
import Teacher from '#models/teachers.js'
import Gender from '#models/gender.js'
import Trayecto from '#models/trayecto.js'

/*
 * No se debe cambiar el orden de las tablas, ya que se crearía un error de foreign key
 */
const tableList = [
  Trayecto,
  Gender,
  Subjects,
  Pnf,
  ContractType,
  PerfilNames,
  Pensum,
  Perfil,
  Teacher
]

export default tableList
