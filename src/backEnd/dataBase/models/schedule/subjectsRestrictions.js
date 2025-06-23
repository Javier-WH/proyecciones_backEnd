import sequelize from "#dataBaseConnection";
import { DataTypes, Model } from "sequelize";

class SubjectRestrictions extends Model {}
SubjectRestrictions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    subject_id: {
      type: DataTypes.UUID,
      references: {
        model: "subjects",
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
    classroom_id: {
      type: DataTypes.UUID,
      references: {
        model: "classrooms",
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

export default SubjectRestrictions;

