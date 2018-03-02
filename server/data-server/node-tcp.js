var net = require('net')    //引入网络模块
const models = require('./model');
const equipment = models.getModel('equipmentData');
console.log(equipment);
var HOST = '0.0.0.0';     //定义服务器地址
var PORT = 9000;            //定义端口号
console.info('Server is running on port ' + PORT);
//创建TCP服务器
var server = net.createServer(function (socket) {
  var client = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Connected to ' + client);
  //监听数据接收事件,防止客户端秒断，不返回消息
  socket.on('data', function (data) {
    // 传过来的数据以空格分割
    const formatData = data.toString('utf8').split(/\s+/);
    console.log(formatData);
    if (formatData.length < 7) {
      // socket.write('data illegal: should be "eqNo interval data1 data2 data3 data4 data5"');
      return;
    }
    ; // 数据不足先返回
    const eqNo = formatData[0];
    const interval = formatData[1];
    // 先查数据是否存在
    equipment.updateOne({eid: eqNo}, {
      eid: eqNo,
      interval: interval,
      updateTime: Date.now(),
      product1: formatData[2] || '',
      product1Data: +formatData[3] || 0,
      product2: formatData[4] || '',
      product2Data: +formatData[5] || 0,
      product3: formatData[6] || '',
      product3Data: +formatData[7] || 0,
    }, {upsert: true}, function (err, doc) {
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