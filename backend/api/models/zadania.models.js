import { DataTypes } from 'sequelize';
import { db } from '../../database.js';

const Zadanie = db.define('zadania', {
  zadanie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  utworzone_przez: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nazwa: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  opis: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('do zrobienia', 'w trakcie', 'gotowe', 'zablokowane'),
    allowNull: false,
    defaultValue: 'do zrobienia'
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true
  },
  utworzone: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  zmodyfikowano: {
    type: DataTypes.DATE,
    allowNull: true
  },
  projekt_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'zadania',
  timestamps: false
});

export default Zadanie;
