const express = require('express');
const cors = require('cors');
const diseaseList = require('../public/diseaseList.json');
const { matchFuzzy } = require('./fuzzy');

const app = express();
const port = 8888;
const logger = console;

app.use(cors());

app.get('/api/v1/search-conditions/', (req, res) => {
  res.json(matchFuzzy(diseaseList, req.query.name));
});

app.listen(port, () => {
  logger.log(`app listening on port ${port}`);
});
