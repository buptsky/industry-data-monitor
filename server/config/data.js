// 模拟数据
const mockData = 'BLQG-0001-ABCD-0002/EFGH-678/B,0.2 ###' + // 通信控制参数 共两个（设备编号 发送间隔）
  'A2018.1.1,8:30,17:30 ###' + // 启停时间 3
  'B2500,2440,4,100 ###' + // 玻璃原片 4
  'C300,400,4,50 ###' + // 玻璃成品 4
  'DG01,2018.1.1 18：30 ###' + // 故障报警 2
  'E0.2,1000,2000,1500,800,1000,1200,2000,2000,2200,35,5,200,260,100,400,20,-2.4,0,0,130 ###' + // 切割参数,21
  'F50,50,50,50,0,0,0,0,1500,1500,1500,1500,2000,2000,2000,2000,500,500,500,500,100,100,100,100,20,20,20,20,4230,2830,4230,4230,-60,-60,-10000,-60,0,0,0,0,4250,2850,0,4250,100,100,100,100,-110,8,100,100,0 ###' + // 机械参数,53
  'G1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,64,64,64,64,6,6,6,6,0,0,0,0,2,2,2,2,1,1,1,1,1,1,1,1 ###' + // 控制器参数,44
  'H0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1 ###' + // 系统参数,24
  'I4,0.8,300,20,200,200,1.1,20,1,1,1,1,1,1.2,20,1.1,20,1,1.1' // 刀压设置,19

//数据数量标准
const dataStandard = [2, 3, 4, 4, 2, 21, 53, 44, 24, 19];
module.exports = {
  mockData,
  dataStandard
};
