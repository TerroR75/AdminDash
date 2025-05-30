import express from "express";
import * as KomentarzController from "../controllers/komentarz.controller.js";

export const router = express.Router();

router.get("/zadanie/:zadanie_id", KomentarzController.getKomentarzeByZadanie);
router.post("/", KomentarzController.createKomentarz);
router.delete("/:id", KomentarzController.removeKomentarz);

export default router;