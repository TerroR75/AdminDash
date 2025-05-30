import express from 'express';
import { getProjects,getUserProjects } from '../controllers/projekty.constrollers.js';

const router = express.Router();

// GET /projekty - zwraca listę projektów
router.get('/', getProjects);
router.get('/users/:userId', getUserProjects);
export default router;
