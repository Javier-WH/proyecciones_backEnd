import sequelize from "#dataBaseConnection";
import { DataTypes, Model } from "sequelize";

class ScheduleConfig extends Model {}
ScheduleConfig.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "schedule_config",
    timestamps: false,
    charset: "utf8mb4",
  }
);

export default ScheduleConfig;

