import ContractType from '#models/contractType.js'
import Perfil from '#models/perfil.js'

export async function getTeacherData (teacher) {
  const contract = await ContractType.findAll({ raw: true })
  const subjectsInPerfil = await Perfil.findAll({ where: { perfil_name_id: teacher.perfil_name_id }, raw: true })

  teacher.partTime = contract.find((c) => c.contractType === teacher.type).hours
  teacher.perfil = subjectsInPerfil.filter((s) => s.perfil_name_id === teacher.perfil_name_id).map((s) => s.subject_id)
  return teacher
}
