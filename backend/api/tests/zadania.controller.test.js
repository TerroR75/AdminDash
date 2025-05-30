import * as Controller from "../controllers/zadania.controller.js";
import { Zadanie, Uzytkownik } from "../models/index.js";
import { jest } from "@jest/globals";

jest.mock("../models/index.js");
Zadanie.findByPk = jest.fn();
Zadanie.create = jest.fn();
Zadanie.update = jest.fn();
Zadanie.destroy = jest.fn();

describe("Zadania Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("getZadanieById - found", async () => {
    Zadanie.findByPk.mockResolvedValue({ zadanie_id: 1 });
    await Controller.getZadanieById({ params: { id: 1 } }, res);
    expect(res.json).toHaveBeenCalledWith({ zadanie_id: 1 });
  });

  test("getZadanieById - not found", async () => {
    Zadanie.findByPk.mockResolvedValue(null);
    await Controller.getZadanieById({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Nie znaleziono" });
  });

  test("createZadania - success", async () => {
    Zadanie.create.mockResolvedValue({ zadanie_id: 1 });
    await Controller.createZadania({ body: { nazwa: "Test" } }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ zadanie_id: 1 });
  });

  test("updateZadania - updated", async () => {
    Zadanie.update.mockResolvedValue([1]);
    Zadanie.findByPk.mockResolvedValue({ zadanie_id: 1 });
    await Controller.updateZadania({ params: { id: 1 }, body: { nazwa: "Nowa" } }, res);
    expect(res.json).toHaveBeenCalledWith({ zadanie_id: 1 });
  });

  test("updateZadania - not found", async () => {
    Zadanie.update.mockResolvedValue([0]);
    await Controller.updateZadania({ params: { id: 1 }, body: { nazwa: "Nowa" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Nie znaleziono" });
  });

  test("deleteZadania - deleted", async () => {
    Zadanie.destroy.mockResolvedValue(1);
    await Controller.deleteZadania({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test("deleteZadania - not found", async () => {
    Zadanie.destroy.mockResolvedValue(0);
    await Controller.deleteZadania({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Nie znaleziono" });
  });
});
