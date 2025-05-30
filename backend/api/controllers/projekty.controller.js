import Projekt from '../models/projekty.models.js';
import Zadanie from '../models/zadania.models.js';
import Uzytkownik from '../models/uzytkownicy.models.js';

// GET /projekty/uzytkownik/:user_id
export const getProjektByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const zadania = await Projekt.findAll({
      include: [
        {
          model: Uzytkownik,
          as: 'uzytkownicy',
          where: { uzytkownik_id: user_id },
          attributes: [],
          through: { attributes: [] }
        }
      ]
    });
    res.json(zadania);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};

// GET //projekty/:projekt_id/uzytkownicy
export const getUsersByProjectId = async (req, res) => {
  const {projekt_id} = req.params;

  try {
    const projekt = await Projekt.findByPk(projekt_id, {
      include: [
        {
          model: Uzytkownik,
          as: 'uzytkownicy',
          through: { attributes: [] } // nie pokazuj tabeli pośredniczącej
        }
      ]
    });

    if (!projekt) {
      return res.status(404).json({ error: 'Projekt nie istnieje' });
    }

    res.json(projekt.uzytkownicy);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};


// POST /projekty
// {
//   "nazwa": String
// }
export const createProject = async (req, res) => {
  try {
    const body = req.body;
    const nowyProjekt = await Projekt.create({ ...body, 'utworzony': Date.now() });
    res.status(201).json(nowyProjekt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas tworzenia projektu' });
  }
};

// Edycja projektu
export const updateProject = async (req, res) => {
  try {
    const projekt = await Projekt.findByPk(req.params.id);
    if (!projekt) {
      return res.status(404).json({ message: 'Projekt nie znaleziony' });
    }
    const { nazwa } = req.body;
    projekt.nazwa = nazwa;
    await projekt.save();
    res.status(200).json(projekt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas aktualizacji projektu' });
  }
};

// Usunięcie projektu
export const deleteProject = async (req, res) => {
  try {
    const projekt = await Projekt.findByPk(req.params.id);
    if (!projekt) {
      return res.status(404).json({ message: 'Projekt nie znaleziony' });
    }
    await projekt.destroy();
    res.status(204).json({ message: 'Projekt został usunięty' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Błąd podczas usuwania projektu' });
  }
};
