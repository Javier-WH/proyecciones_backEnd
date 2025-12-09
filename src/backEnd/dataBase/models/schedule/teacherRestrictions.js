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
    teacher_id: {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model: "teachers",
        key: "id",
      },
    },
    restrictions: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "teachers_restrictions",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

export default TeachersRestrictions;

