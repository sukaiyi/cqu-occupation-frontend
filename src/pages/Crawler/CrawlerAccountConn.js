import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Checkbox,
  Table,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CrawlerAccountConn.less';


/* eslint react/no-multi-comp:0 */
@connect(({ crawAccountConn, loading }) => ({
  crawAccountConn,
  loading: loading.models.crawAccountConn,
}))
class CrawlerList extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crawAccountConn/fetch',
    });
  }

  onToggle = (accountId, crawlId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crawAccountConn/toggle',
      payload: {
        'accountId': accountId,
        'crawlId': crawlId,
      },
    });
  };

  render() {
    const {
      crawAccountConn: { data, columns, rows },
      loading,
    } = this.props;

    const rowDataMap = {};
    for (const row of (rows || [])) {
      rowDataMap[`${row.id}`] = {
        'account': `账号${row.id}`,
        'accountId': `${row.id}`,
      };
    }
    for (const d of data) {
      if(rowDataMap[`${d.accountId}`]){
        rowDataMap[`${d.accountId}`][`crawler_${d.crawlerId}`] = true;
      }
    }
    const rowData = [];
    for (const key in rowDataMap){
      rowData.push(rowDataMap[key]);
    }

    const rawColumns = [{
      title: '账号\\爬虫',
      dataIndex: 'account',
    }];

    rawColumns.push(...(columns || []).map(e => {
      return {
        title: `爬虫${e.crawlId}`,
        dataIndex: `crawler_${e.crawlId}`,
        render: (value, record) => (
          <Fragment>
            <Checkbox defaultChecked={value} onChange={()=>{this.onToggle(record.accountId, e.crawlId)}} />
          </Fragment>
        ),
      };
    }));
    return (
      <PageHeaderWrapper title="对应关系">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={rowData}
              columns={rawColumns}
              pagination={false}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default CrawlerList;
