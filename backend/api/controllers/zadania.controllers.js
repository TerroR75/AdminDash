import { Zadanie, Uzytkownik } from '../models/index.js'; // lub odpowiednia ścieżka jeśli masz inny entry point

export const getAllZadania = async (req, res) => {
  try {
    const tasks = await Zadanie.findAll({
      include: [
        {
          model: Uzytkownik,
          as: 'assignedTo',
          attributes: ['imie', 'nazwisko'],
        },
        {
          model: Uzytkownik,
          as: 'assignedBy',
          attributes: ['imie', 'nazwisko'],
        }
      ],
      attributes: ['zadanie_id', 'deadline', 'opis', 'status']
    });

    const result = tasks.map(task => ({
      id: task.zadanie_id,
      assignedTo: `${task.assignedTo.imie} ${task.assignedTo.nazwisko}`,
      assignedBy: `${task.assignedBy.imie} ${task.assignedBy.nazwisko}`,
      deadline: task.deadline ? task.deadline.toISOString() : null,
      description: task.opis,
      status: task.status
    }));

    res.json(result);
  } catch (error) {
    console.error('Błąd pobierania zadań:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania zadań' });
  }
};


// GET /api/tasks/user/:userId
export const getTasksCreatedByUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID użytkownika' });
  }

  try {
    const tasks = await Zadanie.findAll({
      where: {
        utworzone_przez: userId
      },
      include: [
        {
          model: Uzytkownik,
          as: 'assignedBy',
          attributes: ['email']
        },
        {
          model: Uzytkownik,
          as: 'assignedTo',
          attributes: ['email']
        }
      ],
      attributes: ['zadanie_id', 'deadline', 'opis', 'status']
    });

    if (!tasks.length) {
      return res.status(404).json({ message: 'Brak zadań utworzonych przez tego użytkownika' });
    }

    const result = tasks.map(task => ({
      id: task.zadanie_id,
      assignedBy: task.assignedBy.email,
      assignedTo: task.assignedTo.email,
      deadline: task.deadline ? task.deadline.toISOString() : null,
      description: task.opis,
      status: task.status.toUpperCase()
    }));

    res.json(result);
  } catch (error) {
    console.error('Błąd przy pobieraniu zadań:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania zadań' });
  }
};

export const getTasksByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Nieprawidłowe ID użytkownika' });
  }

  try {
    const tasks = await Zadanie.findAll({
      where: { wykonawca: userId },
      include: [
        {
          model: Uzytkownik,
          as: 'assignedBy',
          attributes: ['email']
        },
        {
          model: Uzytkownik,
          as: 'assignedTo',
          attributes: ['email']
        }
      ],
      attributes: ['zadanie_id', 'deadline', 'opis', 'status']
    });

    const formatted = tasks.map(task => ({
      id: task.zadanie_id,
      assignedTo: task.assignedTo?.email || '',
      assignedBy: task.assignedBy?.email || '',
      deadline: task.deadline,
      description: task.opis,
      status: task.status
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Błąd przy pobieraniu zadań użytkownika:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania zadań' });
  }
};

export const createZadanie = async (req, res) => {
  const {
    utworzone_przez,
    nazwa,
    opis,
    status,
    deadline,
    projekt_id,
    wykonawca
  } = req.body;

  // Walidacja podstawowa
  if (!utworzone_przez || !nazwa || !status || !projekt_id || !wykonawca) {
    return res.status(400).json({ error: 'Brakuje wymaganych pól.' });
  }

  try {
    const newTask = await Zadanie.create({
      utworzone_przez,
      nazwa,
      opis,
      status,
      deadline,
      projekt_id,
      wykonawca
    });

    res.status(201).json({
      message: 'Zadanie zostało utworzone pomyślnie.',
      task: newTask
    });
  } catch (error) {
    console.error('Błąd podczas tworzenia zadania:', error);
    res.status(500).json({ error: 'Wystąpił błąd przy tworzeniu zadania.' });
  }
};

export const updateZadanieStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const dozwoloneStatusy = ['gotowe', 'zablokowane'];
  if (!dozwoloneStatusy.includes(status)) {
    return res.status(400).json({ error: 'Nieprawidłowy status – dozwolone: "gotowe", "zablokowane"' });
  }

  try {
    const zadanie = await Zadanie.findByPk(taskId);
    if (!zadanie) {
      return res.status(404).json({ error: 'Zadanie nie znalezione' });
    }

    zadanie.status = status;
    await zadanie.save();

    res.json({ message: 'Status zadania został zaktualizowany', zadanie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Błąd przy aktualizacji statusu zadania' });
  }
};


export const reassignZadanie = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { newAssigneeId } = req.body;

  if (isNaN(taskId) || !newAssigneeId) {
    return res.status(400).json({ error: 'Nieprawidłowe dane wejściowe' });
  }

  try {
    const zadanie = await Zadanie.findByPk(taskId);

    if (!zadanie) {
      return res.status(404).json({ error: 'Zadanie nie znalezione' });
    }

    // Przypisz nowego wykonawcę tylko jeśli jest inny niż obecny
    if (zadanie.wykonawca !== newAssigneeId) {
      zadanie.wykonawca = newAssigneeId;
      zadanie.zmodyfikowano = new Date(); // aktualizuj znacznik czasu

      await zadanie.save(); // zapis zmian
    }

    res.json({ message: 'Zadanie zostało przypisane ponownie', zadanie });
  } catch (error) {
    console.error('Błąd przy ponownym przypisaniu zadania:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji zadania' });
  }
};


