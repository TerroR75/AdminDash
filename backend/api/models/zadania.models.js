import { DataTypes } from 'sequelize';
import sequelize from '../../database.js'; 

const Zadanie = sequelize.define('Zadanie', {
  zadanie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  projekt_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nazwa: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  opis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('do zrobienia', 'w trakcie', 'gotowe', 'zablokowane'),
    defaultValue: 'do zrobienia',
    allowNull: false,
  },
  utworzone: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  zmodyfikowano: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'zadania',
  timestamps: false,
});


export default Zadanie;
