import PerfilNames from '#models/perfilNames.js'
import Subjects from '#models/subjects.js'
import Perfil from '#models/perfil.js'
import Pnf from '#models/pnf.js'
import Pensum from '#models/pensum.js'
import ContractType from '#models/contractType.js'
import Teacher from '#models/teachers.js'
import Gender from '#models/gender.js'

/*
 * No se debe cambiar el orden de las tablas, ya que se crearía un error de foreign key
  0. Gender,
  1. Subjects,
  2. Pnf,
  3. ContractType,
  4. PerfilNames,
  5. Pensum,
  6. Perfil
  7. Teacher,
 */
const tableList = [
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
