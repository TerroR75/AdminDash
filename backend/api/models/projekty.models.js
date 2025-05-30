import { DataTypes } from 'sequelize';
import sequelize from '../../database.js';

const Projekt = sequelize.define('Projekt', {
  projekt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nazwa: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  utworzony: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Ustawienie domyślnej wartości na aktualny czas
  },
}, {
  tableName: 'projekty',
  timestamps: false, // Jeśli nie chcesz, by Sequelize automatycznie dodawał createdAt/updatedAt
});

export default Projekt;
