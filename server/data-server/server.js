const express = require('express');
const models = require('./model');
const equipment = models.getModel('equipmentData');
const app = express();
app.use('/dist', express.static(`${__dirname}/dist`));
app.get('/', (req, res) => {
  console.log(req.originalUrl);
  res.sendFile(`${__dirname}/index.html`);
});
app.get('/data/monitorData.do', (req, res) => {
  equipment.find({}, function (err, doc) {
    res.json({
      status: 1,
      data: doc,
      errors: []
    });
  });
});
app.listen(8000);