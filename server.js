const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;
const dotenv = require('dotenv');
const { authenticateUser } = require('./controllers/authController');
dotenv.config();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
});
let sockets = new Set();
io.on('connection', (socket) => {
  sockets.add(socket.id);
  console.log('User connected:', socket.id);
  socket.on('sendMessage', (message) => {
    console.log('Message:', message);
    io.emit('receiveMessage', {text: message.text, timestamp: new Date()});
  })
  socket.emit('welcome', `Welcome to the chat server!${socket.id}`);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  if(req.headers.authorization) {
    authenticateUser(req, res, next);
  } else {
    next();
  }
});

fs.readdirSync('./routes').forEach(file => {
  const route = require(`./routes/${file}`);
  app.use('/api', route);
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});