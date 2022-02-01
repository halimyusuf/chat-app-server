import Member from './models/member';
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

  io.on('connection', async (socket) => {
    // emit all users
    const users = [];
    // console.log(io.of('/').sockets.keys());
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userId: socket.id,
        username: socket.username
      });
    }
    // console.log(users);
    socket.emit('users', users);
    socket.broadcast.emit('user connected', {
      userId: socket.userId,
      username: socket.username
    });

    console.log(socket.userId);
    const workspaces = await Member.find({ user: socket.userId }).populate('workspace');
    // console.log(workspaces);
    // console.log(ioyarn .sockets.sockets);
    workspaces.forEach((workspace) => {
      const ws = workspace.workspace;
      if (ws) {
        // console.log(`${ws.name}-${ws._id}-${ws.createdBy}`);
        io.of(`/${ws.name}-${ws._id}-${ws.createdBy}`).on('connection', (wsSocket) => {
          // console.log(socket);
          // const wsSocket = nSocket.nsp;
          // console.log('connected-' + ws.name);
          wsSocket.emit('WSConn', 'Joined ' + ws.name);
          wsSocket.once('wsClientConn', () => {
            console.log('Connect at client');
          });
        });
      }
    });
    // on join room
    // io.of('/');
  });
}
