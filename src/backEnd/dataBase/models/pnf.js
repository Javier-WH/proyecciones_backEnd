import sequelize from '../connection/ORMconnection.js'
import { DataTypes, Model } from 'sequelize'

class Pnf extends Model { }
Pnf.init(
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
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'pnfs',
    timestamps: false
  }
)

export default Pnf
