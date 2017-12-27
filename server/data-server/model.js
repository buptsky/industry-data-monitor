const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// 链接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/buptdata';
mongoose.connect(DB_URL, {useMongoClient: true});
mongoose.connection.on('connected', function () {
  console.log('mongo connect');
});

const models = {
  equipmentData: {
    eid: {type: String, require: true},
    interval: {type: String, require: true},
    updateTime: {type: Number},
    product1: {type: String},
    product1Data: {type: Number},
    product2: {type: String},
    product2Data: {type: Number},
    product3: {type: String},
    product3Data: {type: Number}
  }
}

for (let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
}
