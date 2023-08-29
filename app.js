const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts.routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

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

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
