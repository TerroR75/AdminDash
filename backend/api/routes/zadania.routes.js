import express from 'express';
import { createZadanie, getAllZadania, getTasksCreatedByUser,getTasksByUserId, updateZadanieStatus, reassignZadanie } from '../controllers/zadania.controllers.js';

const router = express.Router();

router.get('/', getAllZadania);
router.get('/user/:userId', getTasksByUserId)
router.get('/created-by/:userId', getTasksCreatedByUser)
router.post('/',createZadanie)
router.patch('/:taskId/status',updateZadanieStatus);
router.patch('/:id/reassign', reassignZadanie);
export default router;
