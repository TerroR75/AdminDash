import { db } from '../../database.js';
import { Uzytkownik, Projekt } from '../models/index.js'

// GET /uzytkownicy
export const getAllUsers = async (req, res) => {
  try {
    const users = await Uzytkownik.findAll({
      attributes: [
        'uzytkownik_id',
        'imie',
        'nazwisko',
        'email',
        ['nr_tel', 'phone'],
        'czy_aktywny',
        'dzial',
        [
          db.literal(`(
            SELECT COUNT(*)
            FROM zadania
            WHERE zadania.wykonawca = uzytkownik.uzytkownik_id
          )`),
          'tasksCount'
        ]
      ],
      raw: true,
      order: [['dzial', 'ASC'], ['imie', 'ASC']]
    });

    const departmentsMap = new Map();

    users.forEach(user => {
      const dept = user.dzial;
      if (!departmentsMap.has(dept)) {
        departmentsMap.set(dept, []);
      }

      departmentsMap.get(dept).push({
        name: `${user.imie} ${user.nazwisko}`,
        email: user.email,
        phone: user.phone,
        status: user.czy_aktywny ? 'aktywny' : 'nieaktywny',
        tasks: parseInt(user.tasksCount, 10)
      });
    });

    const result = Array.from(departmentsMap.entries()).map(([name, employees]) => ({
      name,
      employees
    }));

    res.json(result);
  } catch (error) {
    console.error('Błąd podczas pobierania użytkowników:', error);
    res.status(500).json({ message: 'Coś poszło nie tak' });
  }
};



export const getUsersByManager = async (req, res) => {
  const managerId = parseInt(req.params.managerId, 10);

  if (isNaN(managerId)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID kierownika' });
  }

  try {
    const users = await Uzytkownik.findAll({
      where: {
        kierownik_id: managerId,
        usuniety: null
      },
      attributes: ['uzytkownik_id', 'imie', 'nazwisko', 'email', 'dzial', 'stanowisko', 'rola', 'czy_aktywny']
    });

    res.json(users);
  } catch (error) {
    console.error('Błąd przy pobieraniu użytkowników kierownika:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych' });
  }
};


export const getUsersByManagerWithProjects = async (req, res) => {
  const managerId = parseInt(req.params.managerId, 10);

  if (isNaN(managerId)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID kierownika' });
  }

  try {
    const users = await Uzytkownik.findAll({
      where: {
        kierownik_id: managerId,
        usuniety: null
      },
      attributes: [
        'uzytkownik_id',
        'imie',
        'nazwisko',
        'email',
        'dzial',
        'stanowisko',
        'rola',
        'czy_aktywny'
      ],
      include: [
        {
          model: Projekt,
          as: 'projekty',
          through: { attributes: [] }, // ignoruje dane z tabeli pośredniczącej
          attributes: ['projekt_id', 'nazwa']
        }
      ]
    });

    // Formatowanie odpowiedzi: projekty w osobnym polu jako tablica
    const result = users.map(user => ({
      id: user.uzytkownik_id,
      imie: user.imie,
      nazwisko: user.nazwisko,
      email: user.email,
      dzial: user.dzial,
      stanowisko: user.stanowisko,
      rola: user.rola,
      aktywny: user.czy_aktywny,
      projects: user.projekty.map(proj => ({
        id: proj.projekt_id,
        name: proj.nazwa
      }))
    }));

    res.json(result);

  } catch (error) {
    console.error('Błąd przy pobieraniu użytkowników kierownika:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych' });
  }
};
