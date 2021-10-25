import app from './app';
import * as config from './config';
import socketio from 'socket.io';
import execSocket from './socket';

const port = process.env.PORT || config.port;

let server = app;
if (config.NODE_ENV !== 'test') {
  server = app.listen(config.port, console.log(`app running on port ${port}`));
}

const io = socketio(server, {
  cors: '*'
});
execSocket(io);

export default app;
