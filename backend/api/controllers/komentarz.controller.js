import Komentarz from "../models/komentarz.models.js";
import Uzytkownik from "../models/uzytkownicy.models.js";

// GET /komentarz/zadanie/:zadanieId
export const getKomentarzeByZadanie = async (req, res) => {
  const { zadanie_id } = req.params;
  try {
    const komentarze = await Komentarz.findAll({
      where: { zadanie_id },
      include: [{ model: Uzytkownik, attributes: ['uzytkownik_id','imie', 'nazwisko', 'email'] }]
    });
    res.json(komentarze);
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera', details: err.message });
  }
};

// POST /komentarze
// {
//   "zadanie_id": String,
//   "uzytkownik_id": String,
//   "tresc": String
// }
export const createKomentarz = async (req, res) => {
  const body = req.body;
  try {
    const nowy = await Komentarz.create({ ...body, 'utworzony': Date.now() });
    res.status(201).json(nowy);
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: "Błąd przy dodawaniu komentarza" });
  }
};

// DELETE /komentarze/:id
export const removeKomentarz = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Komentarz.destroy({ where: { komentarz_id: id } });
    if (deleted === 0) return res.status(404).json({ error: "Komentarz nie istnieje" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Błąd przy usuwaniu komentarza" });
  }
};
