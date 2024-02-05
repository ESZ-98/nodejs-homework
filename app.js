import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import fs from 'fs/promises';

import 'dotenv/config';

import { router as contactsRouter } from './routes/api/contacts.routes.js';
import { router as usersRouter } from './routes/api/users.routes.js';
import { router as uploadRouter } from './routes/api/upload.routes.js';

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

app.use('/api/', contactsRouter);
app.use('/api/', usersRouter);
app.use('/api/', uploadRouter);
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


const isAccessible = async folder => {
  try {
    await fs.access(folder);
    return true;
  } catch {
    return false;
  }
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder, {
      recursive: true,
    });
  } else {
    console.log('Directories are already created');
  }
};

export default { app, isAccessible, createFolderIsNotExist };
