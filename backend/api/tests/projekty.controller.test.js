import * as Controller from "../controllers/projekty.controller.js";
import Projekt from "../models/projekty.models.js";
import { jest } from "@jest/globals";

jest.mock("../models/projekty.models.js");
Projekt.findAll = jest.fn();
Projekt.findByPk = jest.fn();
Projekt.create = jest.fn();
Projekt.destroy = jest.fn();

describe("Projekty Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test("getProjektByUserId - success", async () => {
    Projekt.findAll.mockResolvedValue([{ nazwa: "Projekt X" }]);
    await Controller.getProjektByUserId({ params: { user_id: 1 } }, res);
    expect(res.json).toHaveBeenCalledWith([{ nazwa: "Projekt X" }]);
  });

  test("getProjektByUserId - error", async () => {
    Projekt.findAll.mockRejectedValue(new Error("fail"));
    await Controller.getProjektByUserId({ params: { user_id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Błąd serwera" }));
  });

  test("getUsersByProjectId - found", async () => {
    Projekt.findByPk.mockResolvedValue({ uzytkownicy: [{ imie: "Jan" }] });
    await Controller.getUsersByProjectId({ params: { projekt_id: 1 } }, res);
    expect(res.json).toHaveBeenCalledWith([{ imie: "Jan" }]);
  });

  test("getUsersByProjectId - not found", async () => {
    Projekt.findByPk.mockResolvedValue(null);
    await Controller.getUsersByProjectId({ params: { projekt_id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Projekt nie istnieje" });
  });

  test("getUsersByProjectId - error", async () => {
    Projekt.findByPk.mockRejectedValue(new Error("fail"));
    await Controller.getUsersByProjectId({ params: { projekt_id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: "Błąd serwera" }));
  });

  test("createProject - success", async () => {
    Projekt.create.mockResolvedValue({ nazwa: "Projekt X" });
    await Controller.createProject({ body: { nazwa: "Projekt X" } }, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ nazwa: "Projekt X" });
  });

  test("createProject - error", async () => {
    Projekt.create.mockRejectedValue(new Error("fail"));
    await Controller.createProject({ body: { nazwa: "Projekt X" } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Błąd podczas tworzenia projektu" });
  });

  test("updateProject - found", async () => {
    Projekt.findByPk.mockResolvedValue({
      nazwa: "Projekt X",
      save: jest.fn().mockResolvedValue({ nazwa: "Projekt X" }),
    });
    await Controller.updateProject({ params: { id: 1 }, body: { nazwa: "Projekt X" } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nazwa: "Projekt X" }));
  });

  test("updateProject - not found", async () => {
    Projekt.findByPk.mockResolvedValue(null);
    await Controller.updateProject({ params: { id: 1 }, body: { nazwa: "Projekt X" } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Projekt nie znaleziony" });
  });

  test("updateProject - error", async () => {
    Projekt.findByPk.mockRejectedValue(new Error("fail"));
    await Controller.updateProject({ params: { id: 1 }, body: { nazwa: "Projekt X" } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Błąd podczas aktualizacji projektu" });
  });

  test("deleteProject - found", async () => {
    const destroyMock = jest.fn();
    Projekt.findByPk.mockResolvedValue({ destroy: destroyMock });
    await Controller.deleteProject({ params: { id: 1 } }, res);
    expect(destroyMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: "Projekt został usunięty" });
  });

  test("deleteProject - not found", async () => {
    Projekt.findByPk.mockResolvedValue(null);
    await Controller.deleteProject({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Projekt nie znaleziony" });
  });

  test("deleteProject - error", async () => {
    Projekt.findByPk.mockRejectedValue(new Error("fail"));
    await Controller.deleteProject({ params: { id: 1 } }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Błąd podczas usuwania projektu" });
  });
});
