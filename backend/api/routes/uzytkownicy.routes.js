import express from 'express';
import * as UzytkownikController from '../controllers/uzytkownicy.controller.js';

export const uzytkownicyRouter = express.Router();

// Routes for users
uzytkownicyRouter.get('/', UzytkownikController.getAllUsers);
uzytkownicyRouter.get('/:id', UzytkownikController.getUserById);
uzytkownicyRouter.post('/', UzytkownikController.createUser);
uzytkownicyRouter.get('/:id/projekty', UzytkownikController.getProjektyByUzytkownik);
uzytkownicyRouter.put('/:id', UzytkownikController.updateUser);
uzytkownicyRouter.delete('/:id', UzytkownikController.deleteUser);

export default uzytkownicyRouter;
