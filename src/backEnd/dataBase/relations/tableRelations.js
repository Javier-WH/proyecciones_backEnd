// Importa los modelos
import Pensum from '../models/pensum.js'
import Pnf from '../models/pnf.js'
import Subject from '../models/subjects.js'

export default function setTableRelations () {
  // Establece las asociaciones entre pnf y subject atraves de la tabla pensum
  Pnf.belongsToMany(Subject, {
    through: Pensum,
    foreignKey: 'pnf_id',
    otherKey: 'subject_id'
  })

  Subject.belongsToMany(Pnf, {
    through: Pensum,
    foreignKey: 'subject_id',
    otherKey: 'pnf_id'
  })

  // Relación entre Pensum y Pnf
  Pensum.belongsTo(Pnf, {
    foreignKey: 'pnf_id',
    as: 'pnf'
  })

  Pnf.hasMany(Pensum, {
    foreignKey: 'pnf_id',
    as: 'pensums'
  })

  // Relación entre Pensum y Subject
  Pensum.belongsTo(Subject, {
    foreignKey: 'subject_id',
    as: 'subject'
  })

  Subject.hasMany(Pensum, {
    foreignKey: 'subject_id',
    as: 'pensums'
  })
}
