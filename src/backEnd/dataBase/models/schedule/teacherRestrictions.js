import sequelize from "#dataBaseConnection";
import { DataTypes, Model } from "sequelize";

class TeachersRestrictions extends Model {}
TeachersRestrictions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    hours_id: {
      type: DataTypes.UUID,
      references: {
        model: "hours",
        key: "id",
      },
    },
    day_id: {
      type: DataTypes.UUID,
      references: {
        model: "days",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "subjects_restrictions",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    indexes: [
      {
        unique: true,
        fields: ["subject_id", "day_id", "classroom_id"],
      },
    ],
  }
);

export default TeachersRestrictions;

