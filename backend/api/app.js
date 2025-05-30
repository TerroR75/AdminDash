import express from 'express';
import sequelize from '../database.js';
import projektyRoutes from './routes/projekty.routes.js';
import zadaniaRoutes from './routes/zadania.routes.js' // Importowanie rout do projektów
import komentarzeRoutes from './routes/komentarz.routes.js';
import uzytkownicyRouter from './routes/uzytkownicy.routes.js';


const app = express();

// Middleware
app.use(express.json()); // Obsługuje body w formacie JSON
app.use(express.urlencoded({ extended: true }));

// Używanie rout
app.use('/api/projekty', projektyRoutes); // Ścieżka do API projektów
app.use('/api/zadania', zadaniaRoutes); // Ścieżka do API projektów
app.use("/api/komentarze", komentarzeRoutes);
app.use("/api/uzytkownicy", uzytkownicyRouter);


// Synchronizacja bazy danych i uruchomienie aplikacji
sequelize.sync({ force: false }).then(() => {
  console.log('Połączenie z bazą danych i synchronizacja zakończona!');
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}).catch((error) => {
  console.error('Błąd połączenia z bazą danych:', error);
});

