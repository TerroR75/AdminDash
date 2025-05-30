import sequelize from '../../database.js';
import Projekt from './projekty.models.js';
import Zadanie from './zadania.models.js';
import Uzytkownik from './uzytkownicy.models.js';
import Komentarz from './komentarz.models.js';

// Definiowanie powiązań między modelami
Projekt.hasMany(Zadanie, { foreignKey: 'projekt_id' });
Zadanie.belongsTo(Projekt, { foreignKey: 'projekt_id' });

// Relacje między innymi modelami jak wcześniej...

// Zadania należą do projektu
Zadanie.belongsTo(Projekt, { foreignKey: 'projekt_id', as: 'projekty' });
Projekt.hasMany(Zadanie, { foreignKey: 'projekt_id', as: 'zadania' });

// Komentarze należą do zadania i użytkownika
Komentarz.belongsTo(Zadanie, { foreignKey: 'zadanie_id' });
Komentarz.belongsTo(Uzytkownik, { foreignKey: 'uzytkownik_id' });
Zadanie.hasMany(Komentarz, { foreignKey: 'zadanie_id' });

// Użytkownicy przypisani do zadań (wiele do wielu)
Zadanie.belongsToMany(Uzytkownik, {
  through: 'przypisani_do_zadan',
  foreignKey: 'zadanie_id',
  otherKey: 'uzytkownik_id',
  as: 'uzytkownicy'
});
Uzytkownik.belongsToMany(Zadanie, {
  through: 'przypisani_do_zadan',
  foreignKey: 'uzytkownik_id',
  otherKey: 'zadanie_id',
  as: 'zadania'
});

// Użytkownicy przypisani do projektów
Projekt.belongsToMany(Uzytkownik, {
  through: 'przypisani_do_projektow',
  foreignKey: 'projekt_id',
  otherKey: 'uzytkownik_id',
  as: 'uzytkownicy',
});
Uzytkownik.belongsToMany(Projekt, {
  through: 'przypisani_do_projektow',
  foreignKey: 'uzytkownik_id',
  otherKey: 'projekt_id',
  as: 'projekty',
});

// Eksportowanie modeli
export { Zadanie, Projekt, Uzytkownik };

// Eksportowanie instancji Sequelize
export default sequelize;
