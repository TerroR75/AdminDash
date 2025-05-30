import { db } from '../../database.js';
import { Projekt, Uzytkownik, Zadanie } from '../models/index.js';

// GET /projekty
export const getProjects = async (req, res) => {
  try {
    // Pobierz projekty z dołączonymi użytkownikami (team) i zadaniami
    const projects = await Projekt.findAll({
      attributes: [
        'projekt_id',
        'nazwa',
        'opis',
        // agregujemy liczbę zadań i liczbę zadań zrobionych (status = 'gotowe')
        [db.fn('COUNT', db.col('zadania.zadanie_id')), 'tasksTotal'],
        [db.fn('SUM', db.literal(`CASE WHEN zadania.status = 'gotowe' THEN 1 ELSE 0 END`)), 'tasksDone'],
      ],
      include: [
        {
          model: Uzytkownik,
          as: 'team',
          attributes: ['uzytkownik_id', 'imie', 'nazwisko', 'stanowisko', 'email'],
          through: { attributes: [] }
        },
        {
          model: Zadanie,
          as: 'zadania',
          attributes: [], // nie pobieramy szczegółów zadań, tylko agregacje liczone w atrybutach
        }
      ],
      group: ['projekty.projekt_id', 'team.uzytkownik_id'],
      raw: false,
      nest: true,
    });

    // Mapujemy do formatu, jaki chcesz
    const formattedProjects = projects.map(p => {
      const tasksTotal = parseInt(p.getDataValue('tasksTotal')) || 0;
      const tasksDone = parseInt(p.getDataValue('tasksDone')) || 0;
      const progress = tasksTotal === 0 ? 0 : Math.round((tasksDone / tasksTotal) * 100);
      let status = 'PLANOWANY';
      if (progress === 100) status = 'ZAKOŃCZONY';
      else if (progress > 0) status = 'W TRAKCIE';

      return {
        id: p.projekt_id,
        name: p.nazwa,
        description: p.opis,
        progress,
        status,
        team: p.team || [],
        tasksDone,
        tasksTotal,
      };
    });

    res.json(formattedProjects);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd przy pobieraniu projektów' });
  }
};

export const getUserProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Uzytkownik.findByPk(userId, {
      include: {
        model: Projekt,
        as: 'projekty',
        attributes: [['projekt_id','id'], ['nazwa', 'name']],
        through: { attributes: [] }, // nie zwracaj danych z tabeli pośredniczącej
      },
    });

    if (!user) return res.status(404).json({ message: 'Użytkownik nie znaleziony' });

    return res.json(user.projekty);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd serwera' });
  }
};
