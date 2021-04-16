require('dotenv').config();
const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.use('/api', require('./controllers/api/index'));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})