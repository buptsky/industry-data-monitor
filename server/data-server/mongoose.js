const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// 链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/buptdata';
mongoose.connect(DB_URL, {useMongoClient: true});
mongoose.connection.on('connected', function () {
  console.log('mongo connect');
});
// 设备编号
const equipNo = ['001', '002', '003', '004', '005'];
const equipment = [];
// 生成model
equipNo.forEach((item, index) => {
  equipment[index] = mongoose.model(item, new mongoose.Schema({
    eid: {type: String, require: true},
    interval: {type: String, require: true},
    updateTime: {type: Number},
    data1: {type: Number},
    data2: {type: Number},
    data3: {type: Number},
    data4: {type: Number},
    data5: {type: Number}
  }, {collection: item}));
});

module.exports = equipment;