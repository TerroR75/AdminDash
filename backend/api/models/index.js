import { db } from '../../database.js';
import Uzytkownik from './uzytkownicy.models.js';
import Zadanie from './zadania.models.js';
import Projekt from './projekty.models.js';

// RELACJE

// Zadania <-> Projekty (1 do wielu)
Zadanie.belongsTo(Projekt, { foreignKey: 'projekt_id', as: 'projekt' });
Projekt.hasMany(Zadanie, { foreignKey: 'projekt_id', as: 'zadania' });

// Zadania <-> Użytkownicy (assignedBy i assignedTo)
Zadanie.belongsTo(Uzytkownik, { foreignKey: 'utworzone_przez', as: 'assignedBy' });
Zadanie.belongsTo(Uzytkownik, { foreignKey: 'wykonawca', as: 'assignedTo' });

Uzytkownik.hasMany(Zadanie, { foreignKey: 'utworzone_przez', as: 'zadaniaUtworzone' });
Uzytkownik.hasMany(Zadanie, { foreignKey: 'wykonawca', as: 'zadaniaWykonywane' });

// Projekty <-> Użytkownicy (wiele do wielu)
Projekt.belongsToMany(Uzytkownik, {
  through: 'przypisani_do_projektow',
  foreignKey: 'projekt_id',
  otherKey: 'uzytkownik_id',
  as: 'team',
});

Uzytkownik.belongsToMany(Projekt, {
  through: 'przypisani_do_projektow',
  foreignKey: 'uzytkownik_id',
  otherKey: 'projekt_id',
  as: 'projekty',
});


export {
  db,
  Zadanie,
  Uzytkownik,
  Projekt
};
