const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose
  .connect('mongodb://localhost:27017/multipageform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas
const userRoutes = require('./routes/userRoutes'); // Importa las rutas
app.use('/api/users', userRoutes); // Monta las rutas

// Iniciar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
