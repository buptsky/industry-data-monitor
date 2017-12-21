import React from 'react';
import DataTable from './table';
import fetchData from '../../util/fetch-data';
import {Button} from 'antd';

class DataMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    this.setState({loading: true});
    fetchData({url: '/data/monitorData.do'}).then((data) => {
      data.forEach((item, index) => { // 数据需要的key值
        item.key = index;
      });
      this.setState({
        data: data,
        loading: false
      });
    });
  }

  render() {
    return (
      <div style={{padding: 20}}>
        <div style={{height: 36, lineHeight: '36px', fontSize: 16,marginBottom: 20, backgroundColor: '#0c60aa', color: '#fff', padding: '0 10px'}}>
          查询所有设备最新状态
          <Button
            onClick={this.getData}
            icon={'reload'}
            size={'small'}
            style={{marginLeft: 20}}
          >
             刷新
          </Button>
        </div>
        <DataTable dataSource={this.state.data} loading={this.state.loading}/>
      </div>
    );
  }
}

export default DataMonitor;