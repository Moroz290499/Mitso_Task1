import express, { Request, Response, NextFunction } from 'express';

import directorRouter from './resources/directors/director.router';
import filmRouter from './resources/films/film.router';
import resultRouter from './resources/results/result.router';

const app = express();

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/directors', directorRouter);
app.use('/films', filmRouter);
app.use('/results', resultRouter);

export default app;
