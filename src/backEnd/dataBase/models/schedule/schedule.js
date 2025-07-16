import sequelize from "#dataBaseConnection";
import { DataTypes, Model } from "sequelize";

class Schedule extends Model {}
Schedule.init(
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
    teacher_id: {
      type: DataTypes.UUID,
      references: {
        model: "teachers",
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
    subject_id: {
      type: DataTypes.UUID,
      references: {
        model: "subjects",
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
    seccion: {
      type: DataTypes.STRING(10),
    },
    quarter: {
      type: DataTypes.STRING(10),
    },
    trayecto_id: {
      type: DataTypes.UUID,
      references: {
        model: "trayectos",
        key: "id",
      },
    },
    turn_id: {
      type: DataTypes.UUID,
      references: {
        model: "turnos",
        key: "id",
      },
    },
    pnf_id: {
      type: DataTypes.UUID,
      references: {
        model: "pnfs",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "schedules",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    indexes: [
      {
        unique: true,
        fields: ["hours_id", "teacher_id", "day_id", "quarter"],
      },
      {
        unique: true,
        fields: ["hours_id", "day_id", "classroom_id", "quarter"],
      },
      /* {
        unique: true,
        fields: ["subject_id", "seccion", "trayecto_id", "turn_id", "pnf_id"],
      },*/
    ],
  }
);

export default Schedule;

