import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Input,
  Button,
  Modal,
  Icon,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Authorized from '@/utils/Authorized';

import styles from './CrawlerListAccount.less';

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
      title="新建爬虫账号"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账号">
        {form.getFieldDecorator('accountNumber', {
          rules: [{ required: true, message: '请输入账号！' }],
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password')(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="数据源ID">
        {form.getFieldDecorator('sourceId')(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账号状态">
        {form.getFieldDecorator('status')(<Input />)}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ crawAccount, loading }) => ({
  crawAccount,
  loading: loading.models.crawAccount,
}))
@Form.create()
class CrawlerAccountList extends PureComponent {
  state = {
    modalVisible: false,
    selectedRows: [],
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '账号',
      dataIndex: 'accountNumber',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '数据源ID',
      dataIndex: 'sourceId',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      render: value => {
        if(value===1){
          return <span>
            <Icon type="smile" theme="twoTone" />
            <span style={{color:"#0000ff",padding:"5px"}}>可用</span>
          </span>;
        }
        return <span>
          <Icon type="frown" theme="twoTone" twoToneColor="#ff0000" />
          <span style={{color:"#ff0000",padding:"5px"}}>禁用</span>
        </span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'oper',
      render: (text, record) => (
        <Fragment>
          <Authorized authority={['3']} noMatch={null}>
            <a onClick={() => {
              this.handleRemove(record);
            }}> 删除 </a>
          </Authorized>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crawAccount/fetch',
    });
  }

  handleRemove = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crawAccount/remove',
      payload: [record.id]
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
      type: 'crawAccount/add',
      payload: {
        ...fields
      },
    });
    this.handleModalVisible();
  };

  render() {
    const {
      crawAccount: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderWrapper title="爬虫账号">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Authorized authority={['3']} noMatch={null}>
                <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                  添加
                </Button>
              </Authorized>
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

export default CrawlerAccountList;
