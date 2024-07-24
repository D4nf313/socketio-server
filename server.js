// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Configura Socket.IO en el servidor HTTP


const PORT = 3000;

// Configura CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
    origin: 'http://localhost:4200', // Permite solicitudes desde este origen
    methods: ['GET', 'POST'], // Permite estos métodos HTTP
    allowedHeaders: ['Content-Type'] // Permite estos encabezados
  }));

// Configura una ruta básica
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Maneja las conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  socket.on('envio data ubicacion', (data) => {
    console.log('Datos recibidos:', data);
    socket.emit('data-received', { message: 'Datos recibidos con éxito' });
  });

  // Maneja la desconexión
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
