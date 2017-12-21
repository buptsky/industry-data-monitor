import '../asset/css/app.css';
import React from 'react';
import ReactDom from 'react-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import DataMonitor from './component/data-monitor/index';

ReactDom.render(
  <LocaleProvider locale={zhCN}>
    <DataMonitor/>
  </LocaleProvider>
,
document.getElementById('app')
);
