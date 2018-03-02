import React from 'react';
import { Table } from 'antd';
import { pagination } from '../../util/common';

const columns = [
  { title: '设备编号', width: 100, dataIndex: 'eid', fixed: 'left' },
  { title: '发送间隔(min)', width: 100, dataIndex: 'interval' },
  { title: '更新时间', dataIndex: 'updateTime' },
];

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1
    };
  }

  // 每页显示条目变化时的回调
  pageSizeChange = (current, size) => {
    this.setState({
      pageNo: 1
    });
  };
  // 页码变化时的回调
  pageNumberChange = (pageNum, pageSize) => {
    this.setState({
      pageNo: pageNum
    });
  };


  render() {
    const data = this.props.dataSource;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          scroll={{ x: 500 }}
          pagination={{
            ...pagination,
            current: this.state.pageNo,
            total: data.length,
            onShowSizeChange: this.pageSizeChange,
            onChange: this.pageNumberChange
          }}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

export default DataTable;
