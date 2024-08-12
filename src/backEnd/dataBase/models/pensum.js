import sequelize from '../connection/ORMconnection.js'
import { DataTypes, Model } from 'sequelize'

class Pensum extends Model { }
Pensum.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    pnf_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pnfs',
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
    quarter: {
      type: DataTypes.JSON,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'pensums',
    timestamps: false
  }
)

export default Pensum
