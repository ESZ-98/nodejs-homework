const mongoose = require('mongoose');
require('dotenv').config();

const express = require('express');
const app = express();
const contactRoutes = require('./routes/contacts.routes');

const PORT = process.env.PORT || 4000;

const connection = mongoose.connect(process.env.DATABASE_URL, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('api/v1', contactRoutes);

connection
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })

  .catch(error => {
    console.error(`Server not running: ${error}`);
    process.exit(1);
  });
