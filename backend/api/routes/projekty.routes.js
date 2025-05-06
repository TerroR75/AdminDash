import express from 'express';
import {
  createProject,
  updateProject,
  deleteProject,
  getProjektByUserId,
  getUsersByProjectId
} from '../controllers/projekty.controller.js';

const router = express.Router();

router.get('/uzytkownik/:user_id', getProjektByUserId);
router.get('/:projekt_id/uzytkownicy', getUsersByProjectId);
router.post('/', createProject);
router.put('/:id', updateProject); 
router.delete('/:id', deleteProject); 

export default router;
