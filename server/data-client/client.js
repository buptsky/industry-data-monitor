const net = require('net');
const mockData = require('../config/data').mockData;
console.log(mockData);

const HOST = 'localhost';
const PORT = 9000;

const client = new net.Socket();
client.connect(PORT, HOST, function () {

  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // 建立连接后立即向服务器发送数据，服务器将收到这些数据
  client.write(mockData);

});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function (data) {

  console.log('DATA: ' + data);
  // 完全关闭连接
  client.destroy();

});

// 为客户端添加“close”事件处理函数
client.on('close', function () {
  console.log('Connection closed');
});