import { Router } from 'express';
import { getAllUsers, getUsersByManager, getUsersByManagerWithProjects } from '../controllers/uzytkownicy.controllers.js';

const router = Router();

// GET /api/uzytkownicy
router.get('/', getAllUsers);
router.get('/manager/:managerId', getUsersByManagerWithProjects)

export default router;
