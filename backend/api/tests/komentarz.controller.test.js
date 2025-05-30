import * as Controller from "../controllers/komentarz.controller.js";
import Komentarz from "../models/komentarz.models.js";
import { jest } from "@jest/globals";

jest.mock("../models/komentarz.models.js");
Komentarz.findAll = jest.fn();
Komentarz.create = jest.fn();
Komentarz.destroy = jest.fn();

describe("Komentarz Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("getKomentarzeByZadanie - success", async () => {
    Komentarz.findAll.mockResolvedValue([{ komentarz_id: 1 }]);
    await Controller.getKomentarzeByZadanie({ params: { zadanie_id: 1 } }, res);
    expect(res.json).toHaveBeenCalledWith([{ komentarz_id: 1 }]);
  });

  test("getKomentarzeByZadanie - error", async () => {
    Komentarz.findAll.mockRejectedValue(new Error("fail"));
    await Controller.getKomentarzeByZadanie({ params: { zadanie_id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Błąd serwera" }));
  });

  test("createKomentarz - success", async () => {
    Komentarz.create.mockResolvedValue({ komentarz_id: 1 });
    await Controller.createKomentarz({ body: { tresc: "test" } }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ komentarz_id: 1 });
  });

  test("createKomentarz - error", async () => {
    Komentarz.create.mockRejectedValue(new Error("fail"));
    await Controller.createKomentarz({ body: { tresc: "test" } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd przy dodawaniu komentarza" });
  });

  test("removeKomentarz - deleted", async () => {
    Komentarz.destroy.mockResolvedValue(1);
    await Controller.removeKomentarz({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  test("removeKomentarz - not found", async () => {
    Komentarz.destroy.mockResolvedValue(0);
    await Controller.removeKomentarz({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Komentarz nie istnieje" });
  });

  test("removeKomentarz - error", async () => {
    Komentarz.destroy.mockRejectedValue(new Error("fail"));
    await Controller.removeKomentarz({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd przy usuwaniu komentarza" });
  });
});
