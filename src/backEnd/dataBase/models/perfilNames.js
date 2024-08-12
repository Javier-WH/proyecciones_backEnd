import sequelize from '../connection/ORMconnection.js'
import { DataTypes, Model } from 'sequelize'

class PerfilNames extends Model {}
PerfilNames.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'perfil_names',
    timestamps: false
  }
)

export default PerfilNames
