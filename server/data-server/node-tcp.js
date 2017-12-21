var net = require('net')    //引入网络模块
const equipment = require('./mongoose');
var HOST = '127.0.0.1';     //定义服务器地址
var PORT = 9000;            //定义端口号
console.info('Server is running on port ' + PORT);
//创建TCP服务器
var server = net.createServer(function(socket) {
  var client = socket.remoteAddress + ':' + socket.remotePort;
  console.log('Connected to ' + client);
  //监听数据接收事件
  socket.on('data', function(data) {
    // 传过来的数据以空格分割
    const formatData = data.toString().split(' ');
    if (formatData.length !== 7) return; // 数据不足先返回
    const eqNo = formatData[0];
    const interval = formatData[1];
    console.log(eqNo);
    equipment.forEach((item) => {
      if (item.modelName === eqNo) { // 数据表名与设备号相同
        item.create({
          eid: eqNo,
          interval: interval,
          updateTime: Date.now(),
          data1: +formatData[2] || 0,
          data2: +formatData[3] || 0,
          data3: +formatData[4] || 0,
          data4: +formatData[5] || 0,
          data5: +formatData[6] || 0
        }, function (err, doc) {
          if (!err) {
            console.log(doc);
          } else {
            console.log(err);
          }
        })
      }
    });
    socket.write('Hello Client!');
  });
  //监听连接断开事件
  socket.on('end', function() {
    console.log('Client disconnected.');
  });
});
//TCP服务器开始监听特定端口
server.listen(PORT, HOST);