export default function (io) {
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('Invalid username'));
    }
    socket.username = username;
    next();
  });

  io.on('connection', (socket) => {
    // emit all users
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userId: id,
        username: socket.username
      });
    }
    socket.emit('users', users);
    // emit all active namespaces
  });
}
