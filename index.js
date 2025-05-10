const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Exuso Guardian is online.');
});

app.get('/script/:name', (req, res) => {
  const { name } = req.params;

  const filePath = path.join(__dirname, 'scripts', `${name}.lua`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('-- Script not found');
  }

  const luaCode = fs.readFileSync(filePath, 'utf8');
  res.setHeader('Content-Type', 'text/plain');
  res.send(luaCode);
});

app.listen(PORT, () => {
  console.log(`Exuso Guardian running on port ${PORT}`);
});