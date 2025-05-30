import { DataTypes } from 'sequelize';
import { db } from '../../database.js';

const Uzytkownik = db.define('Uzytkownik', {
  uzytkownik_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imie: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  nazwisko: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  stanowisko: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  dzial: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rola: {
    type: DataTypes.ENUM('pracownik', 'kierownik', 'admin'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  haslo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nr_tel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  kierownik_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  czy_aktywny: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  utworzony: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  ostatnie_logowanie: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  usuniety: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
}, {
  tableName: 'uzytkownicy',
  timestamps: false,
});

export default Uzytkownik;
