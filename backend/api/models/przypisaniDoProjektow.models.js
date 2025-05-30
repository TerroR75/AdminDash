import { DataTypes } from 'sequelize';
import { db } from '../../database.js';

const PrzypisaniDoProjektow = db.define('przypisani_do_projektow', {
  przypisanie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projekt_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uzytkownik_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'przypisani_do_projektow',
  timestamps: false
});

export default PrzypisaniDoProjektow;