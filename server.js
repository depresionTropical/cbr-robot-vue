// server.js
const express = require('express');
const app = express();
const path = require('path');

// Configurar middleware para servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Configurar una ruta para manejar todas las solicitudes y enviar el archivo 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Configurar el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
