export default function (io) {
  io.use((socket, next) => {
    const user = socket.handshake.auth;
    if (!user) {
      return next(new Error('Invalid user id'));
    }
    socket.userId = user.id;
    socket.username = user.username;
    next();
  });

  io.on('connection', (socket) => {
    // emit all users
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userId: socket.id,
        username: socket.username
      });
    }
    console.log(users);
    socket.emit('users', users);
    socket.broadcast.emit('user connected', {
      userId: socket.id,
      username: socket.username
    });
    // emit all active namespaces
  });
}
