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
    origin: ['http://localhost:3000', 'https://ott-omega.vercel.app'],
    methods: ['GET', 'POST']
  }
});

io.on("connection", (socket) => {
  console.log("🔗 Client connected");

  const activityInterval = setInterval(() => {
    const activities = [
      "Superman",
      "The Conjuring",
      "The Bad Guys",
      "K-POP Dreams",
    ];
    const randomMovie =
      activities[Math.floor(Math.random() * activities.length)];
    socket.emit("activity", {
      message: `Someone started watching ${randomMovie}`,
    });
  }, 5000);

  socket.on("disconnect", () => {
    clearInterval(activityInterval);
    console.log("❌ Client disconnected");
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