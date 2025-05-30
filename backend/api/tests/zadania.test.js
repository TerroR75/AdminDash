import request from 'supertest';
import {app} from '../app.js'; // ścieżka do pliku, gdzie tworzysz Express app
import {Uzytkownik, Projekt, Zadanie, db} from '../models/index.js'; // powinien zawierać Zadanie i Uzytkownik


describe('TEST TASKS', () => {
  let autor, wykonawca, nowyWykonawca, projekt, zadanie;

  beforeAll(async () => {
    autor = await Uzytkownik.create({
      imie: 'Jan',
      nazwisko: 'Kowalski',
      stanowisko: 'Manager',
      dzial: 'IT',
      rola: 'admin',
      email: 'jan.kowalski@example.com',
      haslo: 'haslo123',
      czy_aktywny: 1
    });

    wykonawca = await Uzytkownik.create({
      imie: 'Anna',
      nazwisko: 'Nowak',
      stanowisko: 'Developer',
      dzial: 'IT',
      rola: 'pracownik',
      email: 'anna.nowak@example.com',
      haslo: 'haslo123',
      czy_aktywny: 1
    });

    nowyWykonawca = await Uzytkownik.create({
      imie: 'Piotr',
      nazwisko: 'Zielinski',
      stanowisko: 'Developer',
      dzial: 'IT',
      rola: 'pracownik',
      email: 'piotr.zielinski@example.com',
      haslo: 'haslo123',
      czy_aktywny: 1
    });

    projekt = await Projekt.create({
      nazwa: 'Testowy projekt',
      opis: 'Opis testowego projektu'
    });

    zadanie = await Zadanie.create({
      nazwa: 'Zadanie testowe',
      opis: 'Opis zadania',
      status: 'do zrobienia',
      projekt_id: projekt.projekt_id,
      utworzone_przez: autor.uzytkownik_id,
      wykonawca: wykonawca.uzytkownik_id,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) 
    });
  });

  afterAll(async () => {
    // posprzątaj po testach
    await Zadanie.destroy({ where: { zadanie_id: zadanie.zadanie_id } });
    await Projekt.destroy({ where: { projekt_id: projekt.projekt_id } });
    await Uzytkownik.destroy({ where: { uzytkownik_id: [autor.uzytkownik_id, wykonawca.uzytkownik_id, nowyWykonawca.uzytkownik_id] } });
  });

  it('should return a list of tasks with proper fields GET /tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const task = res.body[0];
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('assignedTo');
    expect(task).toHaveProperty('assignedBy');
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('status');
    expect(task.assignedTo).toBe('Anna Nowak');
    expect(task.assignedBy).toBe('Jan Kowalski');
  });

  it('should reassign the task to a new user PATCH /tasks/:id', async () => {
    const res = await request(app)
      .patch(`/tasks/${zadanie.zadanie_id}/reassign`)
      .send({ newAssigneeId: nowyWykonawca.uzytkownik_id });

    expect(res.statusCode).toBe(200);
  });

  it('should return 400 if taskId is invalid or newAssigneeId missing PATCH /tasks/:id', async () => {
    let res = await request(app).patch('/tasks/invalid/reassign').send({ newAssigneeId: nowyWykonawca.uzytkownik_id });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Nieprawidłowe dane wejściowe' );

    res = await request(app).patch(`/tasks/${zadanie.zadanie_id}/reassign`).send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Nieprawidłowe dane wejściowe' );
  });

  it('should return 404 if task does not exist PATCH /tasks/:id', async () => {
    const res = await request(app)
      .patch('/tasks/999999/reassign') // zakładam, że takiego id nie ma
      .send({ newAssigneeId: nowyWykonawca.uzytkownik_id });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Zadanie nie znalezione');
  });

  it('should update the status of a task PATCH /tasks/:id', async () => {
    const res = await request(app)
      .patch(`/tasks/${zadanie.zadanie_id}/status`)
      .send({ status: 'gotowe' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Status zadania został zaktualizowany');
    expect(res.body.zadanie).toHaveProperty('status', 'gotowe');
  });
});

