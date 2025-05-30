// models/Komentarz.js
import { DataTypes } from "sequelize";
import sequelize from "../../database.js";

const Komentarz = sequelize.define("komentarze", {
  komentarz_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  zadanie_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  uzytkownik_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tresc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  utworzony: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "komentarze",
  timestamps: false
});

export default Komentarz;