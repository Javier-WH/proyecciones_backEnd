import sequelize from '#dataBaseConnection'
import { DataTypes, Model } from 'sequelize'

class Perfil extends Model { }
Perfil.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    perfil_name_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'perfil_names',
        key: 'id'
      }
    },
    subject_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'id'
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'perfiles',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
)

export default Perfil
