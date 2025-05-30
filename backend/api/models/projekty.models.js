import { DataTypes } from 'sequelize';
import { db } from '../../database.js';

const Projekt = db.define('projekty', {
  projekt_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nazwa: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  opis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  utworzony: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'projekty',
  timestamps: false
});

export default Projekt;
