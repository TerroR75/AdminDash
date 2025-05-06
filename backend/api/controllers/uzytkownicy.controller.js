import Uzytkownik from '../models/uzytkownicy.models.js';
import Projekt from '../models/projekty.models.js';

// GET /uzytkownicy
export const getAllUsers = async (req, res) => {
  try {
    const users = await Uzytkownik.findAll({
      attributes: {exclude:['haslo','czy_aktywny','utworzony','ostatnie_logowanie']}
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd przy pobieraniu użytkowników' });
  }
};

// GET /uzytkownicy/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Uzytkownik.findByPk(id,{
      attributes: {exclude:['haslo','czy_aktywny','utworzony','ostatnie_logowanie']}
    });
    if (!user) return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

// /:id/projekty - pobiera wszystkie projekty danego użytkownika
export const getProjektyByUzytkownik = async (req, res) => {
  const { id } = req.params;
  try {
    const uzytkownik = await Uzytkownik.findByPk(id, {
      attributes: {exclude:['haslo','czy_aktywny','utworzony','ostatnie_logowanie']},
      include: [
        {
          model: Projekt,
          as: 'projekty',
          attributes: {exclude:['utworzony']},
          through: { attributes: [] }
        }
      ]
    });
    res.json(uzytkownik);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};

// POST /uzytkownicy
export const createUser = async (req, res) => {
  try {
    const newUser = await Uzytkownik.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Błąd przy tworzeniu użytkownika' });
  }
};

// PUT /uzytkownicy/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Uzytkownik.update(req.body, {
      where: { uzytkownik_id: id }
    });
    if (updated) {
      const user = await Uzytkownik.findByPk(id);
      return res.json(user);
    }
    res.status(404).json({ error: 'Nie znaleziono użytkownika' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

// DELETE /uzytkownicy/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Uzytkownik.destroy({ where: { uzytkownik_id: id } });
    if (deleted) return res.status(204).end();
    res.status(404).json({ error: 'Nie znaleziono użytkownika' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};