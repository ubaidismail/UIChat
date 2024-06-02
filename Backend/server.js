const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dbConnect = require('./Database/index');
const {PORT} = require('./config/index');
const router = require('./routes/index');
const cors = require('cors');

const app = express();
const server = http.createServer(app); // create an http server
const io = socketIo(server); // Initialize Socket.IO with the HTTP server

app.use(cors());

// app.get('/' , (req,res) => {
//     res.send('Hello World 12');
// })
app.use(express.json());

app.use(router);

dbConnect();
const users = {};
io.on('connection' , (socket) => {
  // console.log('Online User ', socket.id);
  socket.on("new-user-joined", (name) => { // server reveives new-user-joined event
    // console.log('A new user name is:', message);
    users[socket.id] = name;
    console.log(name);
    socket.broadcast.emit('user-joined', name); // broadcast sent event to all except sender // server send this event to client
  });

  socket.on('send', message => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id]
    });
  });

  // socket.on('send', (message) => {
  //   const user = users[socket.id];
  //   console.log('Sending message:', message, 'from user:', user);
  //   if (user) {
  //     socket.broadcast.emit('receive', {
  //       message: message,
  //       name: user
  //     });
  //   } else {
  //     console.log('User not found for socket ID:', socket.id);
  //   }
  // });

  socket.on("disconnect", (reason, details) => {
    // the reason of the disconnection, for example "transport error"
    // console.log('User disconnected:', socket.id);
    // delete users[socket.id];
    // console.log('Users after disconnection:', users[socket.id]);
  });
  
})


server.listen(PORT, () => {
  console.log(`Backend in running on port: ${PORT}`)
})