require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Rutas unificadas
const routes = require('./routes'); 
app.use('/api', routes);

// Permite solo desde tu frontend
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));


// Levantar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

