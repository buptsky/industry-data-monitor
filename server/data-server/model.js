const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/buptdata';
mongoose.connect(DB_URL, { useMongoClient: true });
mongoose.connection.on('connected', function () {
  console.log('mongo connect');
});
// 固定colletion配置
const models = {
  equipmentData: { // 设备表配置
    eid: { type: String, require: true }, // 设备编号
    interval: { type: String, require: true }, // 时间间隔
    updateTime: { type: Number }, // 更新时间
    incisionParams: { type: String, require: true }, // 切割参数
    engineParams: { type: String, require: true }, // 机械参数
    controllerParams: { type: String, require: true }, // 控制器参数
    systemParams: { type: String, require: true }, // 系统参数
    pressureParams: { type: String, require: true } // 刀压参数
  }
}
// 动态collction配置
const commonModels = {
  bootTime: { // 启停时间
    date: { type: String, require: true },
    startTime: { type: String, require: true },
    endTime: { type: String, require: true }
  },
  glassSheet: { // 玻璃原片
    length: { type: Number, require: true },
    width: { type: Number, require: true },
    height: { type: Number, require: true },
    num: { type: Number, require: true }
  },
  glassProduct: { // 玻璃成品
    length: { type: Number, require: true },
    width: { type: Number, require: true },
    height: { type: Number, require: true },
    num: { type: Number, require: true }
  },
  faultAlarm: { // 故障报警
    code: { type: String, require: true },
    time: { type: String, require: true },
    reason: { type: String, require: true },
    num: { type: Number, require: true }
  }
}


for (let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]));
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  },
  createModel: function (eid) { // 建立新设备的相关表格
    for (let i in commonModels) {
      mongoose.model(`${i}-${eid}`, new mongoose.Schema(commonModels[i]));
    }
  }
}
