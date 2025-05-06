import {Zadanie, Uzytkownik}  from '../models/index.js'

// GET /api/zadania/:id
export const getZadanieById = async (req, res) => {
  const result = await Zadanie.findByPk(req.params.id, {
    include: [{
      model: Uzytkownik,
      as: 'uzytkownicy', 
      through: { attributes: [] },
      attributes: ['uzytkownik_id', 'imie', 'nazwisko', 'email']
    }]
  })
  if (result) return res.json(result)
  res.status(404).json({ error: 'Nie znaleziono' })
}

// POST /zadania
// BODY { 
//   "nazwa": String,
//   "opis": String,
//   "status": "do zrobienia",
//   "projekt_id": String
// }
export const createZadania = async (req, res) => {
  const nowy = await Zadanie.create({...req.body});
  res.status(201).json(nowy)
}

// PATCH /api/zadania
export const updateZadania = async (req, res) => {
  const [updated] = await Zadanie.update({...req.body,'zmodyfikowano': Date.now()}, {
    where: { 'zadanie_id': req.params.id },
  })
  if (updated) {
    const result = await Zadanie.findByPk(req.params.id)
    return res.json(result)
  }
  res.status(404).json({ error: 'Nie znaleziono' })
}

// DELETE /api/zadania
export const deleteZadania = async (req, res) => {
  const deleted = await Zadanie.destroy({ where: { 'zadanie_id': req.params.id } })
  if (deleted) return res.status(204).send()
  res.status(404).json({ error: 'Nie znaleziono' })
}
