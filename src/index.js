require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Importar rutas
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Levantar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
