import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Button,
  Modal,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './CrawlerList.less';

const FormItem = Form.Item;
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建爬虫"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="数据源">
        {form.getFieldDecorator('dataSource', {
          rules: [{ required: true, message: '请输入数据源！' }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="功能">
        {form.getFieldDecorator('function')(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="休眠策略">
        {form.getFieldDecorator('sleepManner')(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="休眠时间 X">
        {form.getFieldDecorator('sleepT1')(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="休眠时间 Y">
        {form.getFieldDecorator('sleepT2')(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('describe')(<Input />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ craw, loading }) => ({
  craw,
  loading: loading.models.craw,
}))
@Form.create()
class CrawlerList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'crawlId',
    },
    {
      title: '数据源',
      dataIndex: 'dataSource',
    },
    {
      title: '功能',
      dataIndex: 'function',
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '休眠策略',
      dataIndex: 'sleepManner',
    },
    {
      title: '休眠时间 X',
      dataIndex: 'sleepT1',
    },
    {
      title: '休眠时间 Y',
      dataIndex: 'sleepT2',
    },
    {
      title: '描述',
      dataIndex: 'describe',
    },
    {
      title: '更新时间',
      dataIndex: 'update',
    },
    {
      title: '操作',
      dataIndex: 'oper',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => {
            this.handleRemove(record);
          }}> 删除 </a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'craw/fetch',
    });
  }

  handleRemove = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'craw/remove',
      payload: [record.crawlId],
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'craw/add',
      payload: {
        ...fields
      },
    });
    this.handleModalVisible();
  };

  render() {
    const {
      craw: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="爬虫状态">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                添加
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default CrawlerList;
