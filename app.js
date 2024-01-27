import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

// import { router as contactsRouter } from './routes/api/contacts.js';
import { router as usersRouter } from '../routes/api/users.routes.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
import './config/config.password.js';

mongoose
  .connect(process.env.DATABASE_URL, {
    dbName: 'db-contacts',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.error(`Server not running: ${error}`);
    process.exit(1);
  });

// app.use('/api/', contactsRouter);
app.use('/api/', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
