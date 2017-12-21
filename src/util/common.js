/*Common config*/
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const yesterday = moment().subtract(1, 'day');
const last6days = moment().subtract(6, 'day');
const lastWeek5 = moment().startOf('week').subtract(1, 'days');
const lastWeek1 = moment().startOf('week').subtract(7, 'days');
const thisMonth1 = moment().startOf('month');
const lastMonthFirstDay = moment().startOf('month').subtract(1, 'months');
const lastMonthLastDay = moment().startOf('month').subtract(1, 'days');

export const pagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20'],
  defaultPageSize: 10
};

export const rangePicker =  {
  disabledDate: (current)=> {
    return current.isAfter(moment());
  },
  ranges: {
    '昨天': [yesterday, yesterday],
    '今天': [moment(), moment()],
    '最近七天': [last6days, moment()],
    '上周': [lastWeek1,  lastWeek5],
    '本月': [thisMonth1, yesterday],
    '上月': [lastMonthFirstDay, lastMonthLastDay]
  }
}