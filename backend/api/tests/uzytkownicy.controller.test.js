import * as Controller from "../controllers/uzytkownicy.controller.js";
import Uzytkownik from "../models/uzytkownicy.models.js";
import { jest } from "@jest/globals";

jest.mock("../models/uzytkownicy.models.js");
Uzytkownik.destroy = jest.fn();
Uzytkownik.findAll = jest.fn();
Uzytkownik.findByPk = jest.fn();
Uzytkownik.create = jest.fn();
Uzytkownik.update = jest.fn();

describe("Uzytkownicy Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("getAllUsers - success", async () => {
    Uzytkownik.findAll.mockResolvedValue([{ imie: "Jan", nazwisko: "Kowalski" }]);
    await Controller.getAllUsers({}, res);
    expect(res.json).toHaveBeenCalledWith([{ imie: "Jan", nazwisko: "Kowalski" }]);
  });

  test("getAllUsers - error", async () => {
    Uzytkownik.findAll.mockRejectedValue(new Error("fail"));
    await Controller.getAllUsers({}, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd przy pobieraniu użytkowników" });
  });

  test("getUserById - found", async () => {
    Uzytkownik.findByPk.mockResolvedValue({ imie: "Jan", nazwisko: "Kowalski" });
    await Controller.getUserById({ params: { id: 1 } }, res);
    expect(res.json).toHaveBeenCalledWith({ imie: "Jan", nazwisko: "Kowalski" });
  });

  test("getUserById - not found", async () => {
    Uzytkownik.findByPk.mockResolvedValue(null);
    await Controller.getUserById({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Nie znaleziono użytkownika" });
  });

  test("getUserById - error", async () => {
    Uzytkownik.findByPk.mockRejectedValue(new Error("fail"));
    await Controller.getUserById({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd serwera" });
  });

  test("createUser - success", async () => {
    Uzytkownik.create.mockResolvedValue({ imie: "Jan" });
    await Controller.createUser({ body: { imie: "Jan" } }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ imie: "Jan" });
  });

  test("createUser - error", async () => {
    Uzytkownik.create.mockRejectedValue(new Error("fail"));
    await Controller.createUser({ body: { imie: "Jan" } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd przy tworzeniu użytkownika" });
  });

  test("updateUser - updated", async () => {
    Uzytkownik.update.mockResolvedValue([1]);
    Uzytkownik.findByPk.mockResolvedValue({ imie: "Jan" });
    await Controller.updateUser({ params: { id: 1 }, body: { imie: "Jan" } }, res);
    expect(res.json).toHaveBeenCalledWith({ imie: "Jan" });
  });

  test("updateUser - not found", async () => {
    Uzytkownik.update.mockResolvedValue([0]);
    await Controller.updateUser({ params: { id: 1 }, body: { imie: "Jan" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Nie znaleziono użytkownika" });
  });

  test("updateUser - error", async () => {
    Uzytkownik.update.mockRejectedValue(new Error("fail"));
    await Controller.updateUser({ params: { id: 1 }, body: { imie: "Jan" } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd serwera" });
  });

  test("deleteUser - deleted", async () => {
    Uzytkownik.destroy.mockResolvedValue(1);
    await Controller.deleteUser({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });

  test("deleteUser - not found", async () => {
    Uzytkownik.destroy.mockResolvedValue(0);
    await Controller.deleteUser({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Nie znaleziono użytkownika" });
  });

  test("deleteUser - error", async () => {
    Uzytkownik.destroy.mockRejectedValue(new Error("fail"));
    await Controller.deleteUser({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Błąd serwera" });
  });
});
