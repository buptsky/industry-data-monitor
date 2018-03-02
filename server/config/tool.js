const standard = require('./data').dataStandard;

// 格式化传输数据
function formatData(data) {
  const splitData = data.toString('utf8').split(/###/).map(item => item.trim()); // 逐行分解数据
  console.log(splitData);
  checkData(splitData); // 检查数据合法性
  const comm = splitData[0].split(/[,，]/); // 通信数据
  const bootTime = splitData[1].split(/[,，]/);

  return {
    eq: { // 公共表数据
      eid: comm[0], // 设备编号
      interval: comm[1], // 时间间隔
      updateTime: Date.now(), // 更新时间
      incisionParams: splitData[5].substr(1), // 切割参数 （去除首个无意义字符，下同）
      engineParams: splitData[6].substr(1), // 机械参数
      controllerParams: splitData[7].substr(1), // 控制器参数
      systemParams: splitData[8].substr(1), // 系统参数
      pressureParams: splitData[9].substr(1) // 刀压参数
    },
    bootTime: { // 启停时间
      needUpdate: checkUpdate(splitData[1])
    },
    glassSheet: { // 玻璃原片
      needUpdate: true
    },
    glassProduct: { // 玻璃成品
      needUpdate: true
    },
    faultAlarm: { // 故障报警
      needUpdate: true
    }
  }
}

// 检查数据合法性
function checkData(data) {
  data.length !== 10 && console.log(`数据行数不足 当前包含${data.length}行数据`);
  data.forEach((item, index) => {
    if (item.split(/[,，]/).length !== standard[index]) {
      console.log(`第${index}行数据错误 当前包含${item.split(/[,，]/).length}个数据 应包含${index}个数据`)
    }
  });
}
// 检查数据是否需要更新
function checkUpdate(data) {
  return data[0] === 'N';
}

module.exports = {
  formatData
}