const net = require('net')    //引入网络模块
const models = require('./model');
const formatData = require('../config/tool').formatData;
const equipment = models.getModel('equipmentData');
const HOST = '0.0.0.0';     //定义服务器地址
const PORT = 9000;            //定义端口号
console.info('Server is running on port ' + PORT);
//创建TCP服务器
const server = net.createServer(function (socket) {
  const client = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Connected to ' + client);
  //监听数据接收事件,防止客户端秒断，不返回消息
  socket.on('data', function (data) {
    // 传过来的数据以空格分割
    const ret = formatData(data);
    const eid = ret.eq.eid
    console.log(ret);
    try {
      models.getModel(`bootTime-${eid}`);
    } catch (err) { // 不存在针对该设备的数据库
      models.createModel(eid);
      const boot = models.getModel(`bootTime-${eid}`);
      boot.updateOne({ date: 1 }, {
        date: 1,
      }, { upsert: true }, function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      });
    }
    // 先查数据是否存在
    equipment.updateOne({ eid }, ret.stable, { upsert: true }, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
      }
    });
  });
  //监听连接断开事件
  socket.on('end', function (err, msg) {
    console.log('Client disconnected');
  });
  //
  socket.on('error', function (err) {
    console.log(err);
  });
});
//TCP服务器开始监听特定端口
server.listen(PORT, HOST);