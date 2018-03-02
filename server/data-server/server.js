const express = require('express');
const models = require('./model');
const equipment = models.getModel('equipmentData');
const app = express();
// 静态资源托管
// app.use('/dist', express.static(`${__dirname}/dist`));
// app.get('/', (req, res) => {
//   console.log(req.originalUrl);
//   res.sendFile(`${__dirname}/index.html`);
// });
// app.use((req, res, next) => {
//
//   next();
// });
// 跨域CORS处理
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') { // 预检请求 处理
    res.send(200);
  } else {
    next();
  }
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
app.get('/data/getEqDetail.do', (req, res) => {
  console.log(req.query);
});
app.listen(8000);