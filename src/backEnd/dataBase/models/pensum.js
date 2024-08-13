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
    hours: {
      type: DataTypes.STRING,
      allowNull: false
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
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
)

export default Pensum
