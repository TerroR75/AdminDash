import express from 'express';
import { getZadanieById, createZadania, updateZadania, deleteZadania } from '../controllers/zadania.controller.js';

const router = express.Router();

// Pobierz zadanie po ID
router.get('/:id', getZadanieById);

// Dodaj nowe zadanie
router.post('/', createZadania);

// Edytuj zadanie
router.patch('/:id', updateZadania);

// Usuń zadanie
router.delete('/:id', deleteZadania);

export default router;
