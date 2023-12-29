import express, { json, urlencoded } from 'express';
import formidable from 'express-formidable';
const app = express();
const PORT = 8080;
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import hostRouter from './routes/host.js';

app.use((req, res, next) => {
  if (req.is('multipart/form-data')) {
    formidable({
      encoding: 'utf-8',
      multiples: true,
      keepExtensions: true,
    })(req, res, next);
  } else {
    return next();
  }
});

app.use(json({ limit: '50mb' }));
app.use(urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// route handlers
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/host', hostRouter);

// catch-all error handler
app.get('*', (req, res) => {
  return res.status(404).send("This is not the page you're looking for...");
});

// Global error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
