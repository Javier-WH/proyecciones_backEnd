import sequelize from '../connection/ORMconnection.js'
import { DataTypes, Model } from 'sequelize'

class Subjects extends Model { }
Subjects.init(
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
    modelName: 'subjects',
    timestamps: false
  }
)

export default Subjects
