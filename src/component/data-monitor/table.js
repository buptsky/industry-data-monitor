import React from 'react';
import {Table} from 'antd';
import {pagination} from '../../util/common';
const columns = [
  {title: '设备编号', width: 100, dataIndex: 'eid', fixed: 'left'},
  {title: '发送间隔(min)', width: 100, dataIndex: 'interval'},
  {title: '更新时间', dataIndex: 'updateTime'},
  {title: '产品1名称', dataIndex: 'product1'},
  {title: '产品1数据', dataIndex: 'product1Data'},
  {title: '产品2名称', dataIndex: 'product2'},
  {title: '产品2数据', dataIndex: 'product2Data'},
  {title: '产品3名称', dataIndex: 'product3'},
  {title: '产品3数据', dataIndex: 'product3Data'}
];

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1
    };
  }

  render() {
    const data = this.props.dataSource;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          scroll={{x: 800}}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default DataTable;
