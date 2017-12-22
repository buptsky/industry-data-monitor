const express = require('express');
const equipment = require('./mongoose');
const app = express();
app.use('/dist', express.static(`${__dirname}/dist`));
app.get('/', (req, res) => {
  console.log(req.originalUrl);
  res.sendFile(`${__dirname}/index.html`);
});
app.get('/data/monitorData.do', (req, res) => {
  const promises = [];
  equipment.forEach((eq, index) => {
    promises.push(eq.findOne({}, null, {sort: {'_id': -1}}).exec());
  })
  Promise.all([...promises]).then((data) => {
    data.filter(item => item); // 确保数据存在
    res.json({
      status: 1,
      data: data,
      errors: []
    });
    console.log(data);
  });
});
app.listen(8000);