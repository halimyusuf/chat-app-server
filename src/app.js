import express from 'express';
import createError from 'http-errors';
import routes from './routes';
import mongoInit from './loaders/mongoose';
import cors from 'cors';

mongoInit.initDB();
const app = express();

app.get('/', (req, res) => res.send('Ping'));
app.use(cors());
app.use(express.json());
routes(app);
app.use((_req, _res, next) => {
  next(createError(404));
});
app.use((err, _req, res, _next) =>
  res.status(err.status || 500).json({
    error: 'error',
    message: err.message
  })
);

export default app;
