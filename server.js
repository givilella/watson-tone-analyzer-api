require('dotenv').config();
const express = require('express');
const logger = require('morgan');

const app = express();

const PORT = process.env.PORT;

app.use(logger('tiny'));
app.use(express.json());
app.use('/api', require('./controllers/api/index'));

app.use('/', (req, res) => {
  res.send('Working!');
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
