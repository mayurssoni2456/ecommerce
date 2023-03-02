import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { corsUrl, environment } from './config';
import './database'; // initialize database

import {
  NotFoundError,
  ApiError,
  InternalError,
  ErrorType,
} from './common/ApiError';
import router from './routes';

process.on('uncaughtException', (e) => {
  console.log("uncaughtException", e);
});

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/', router);

// catch 404 and forward to error handler
app.use((req: Request, res:Response, next:any) => next(new NotFoundError()));

// Middleware Error Handler

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      console.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
      );
  } else {
    console.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    console.error(err);
    if (environment === 'development') {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;