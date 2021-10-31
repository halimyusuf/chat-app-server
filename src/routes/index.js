import userRouter from './user';
import workspaceRouter from './workspace';
import channelRouter from './channel';

const baseUrl = '/api/v1';

export default (app) => {
  app.use(`${baseUrl}/user`, userRouter);
  app.use(`${baseUrl}/workspace`, workspaceRouter);
  app.use(`${baseUrl}/channel`, channelRouter);
};

// Router.get('/', (req, res) => res.send('Hello world'));
