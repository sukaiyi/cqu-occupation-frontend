import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Col,
  Select,
  Row,
  Card,
  Form,
  Input,
  Button,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import Authorized from '@/utils/Authorized';
import styles from './UserInfoList.less';

const Degree = {
  '0': '专科',
  '1': '本科',
  '2': '硕士',
  '3': '博士',
  '4': '博士后',
  '5': '其他（短期培训,进修课程等）',
  '6': '小学',
  '7': '初中',
  '8': '中专',
  '9': '高中',
  '255': '错误值',
};
const FormItem = Form.Item;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(({ userInfo, loading }) => ({
  userInfo,
  loading: loading.models.userInfo,
}))
@Form.create()
class UserInfoList extends PureComponent {
  state = {
    selectedRows: [],
    path: "/data/list",
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (value)=>{
        const map = {
          '1': '男',
          '2': '女',
        };
        return map[`${value}`];
      }
    },
    {
      title: '公司',
      dataIndex: 'company',
    },
    {
      title: '职业',
      dataIndex: 'profession',
    },
    {
      title: '职位',
      dataIndex: 'position',
    },
    {
      title: '工作地点',
      dataIndex: 'location',
    },
    {
      title: '操作',
      dataIndex: 'oper',
      render: (text, record) => {
        const { path } = this.state;
        const actions = {
          '/data/list': (
            <Fragment>
              <a onClick={() => {
                router.push(`/data/detail/${record.id}`);
              }}
              > 查看详情
              </a>
              <Authorized authority={['3']} noMatch={null}>
                <Divider type="vertical" />
                <a onClick={() => {
                  router.push(`/data/edit/${record.id}`);
                }}
                > 编辑
                </a>
                <Divider type="vertical" />
                <a onClick={() => {
                  this.handleRemove(record);
                }}
                > 删除
                </a>
              </Authorized>
            </Fragment>),
          '/report/list': (
            <Fragment>
              <Authorized authority={['2','3']} noMatch={null}>
              <a onClick={() => {
                router.push(`/report/page/${record.id}`);
              }}
              > 查看评估报告
              </a>
              </Authorized>
            </Fragment>
          ),
        };
        return actions[path];
      },
    },
  ];

  componentDidMount() {
    const { dispatch, match: { path } } = this.props;
    dispatch({
      type: 'userInfo/fetch',
    });
    this.setState({path});
  }

  handleRemove = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userInfo/remove',
      payload: [record.id],
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'userInfo/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const condition = [];
      if (fieldsValue.gender && fieldsValue.gender !== '-1') {
        condition.push({ field: 'gender', value: fieldsValue.gender });
      }
      if (fieldsValue.degree && fieldsValue.degree !== '-1') {
        condition.push({ field: 'degree', value: fieldsValue.degree });
      }
      if (fieldsValue.field2 && fieldsValue.field2 !== '全部') {
        condition.push({ field: 'field2', value: fieldsValue.field2, comparator: 'CN' });
      }
      if (fieldsValue.name) {
        condition.push({ field: 'name', value: fieldsValue.name, comparator: 'CN' });
      }
      const values = {
        condition,
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'userInfo/fetch',
        payload: values,
      });
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'userInfo/fetch',
    });
  };

  renderForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const degree = [];
    for (const key in Degree) {
      degree.push(<Select.Option value={key}>{Degree[key]}</Select.Option>);
    }
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="请输入要搜索的姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="性别">
              {getFieldDecorator('gender')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="-1">全部</Select.Option>
                  <Select.Option value="1">男</Select.Option>
                  <Select.Option value="2">女</Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="行业">
              {getFieldDecorator('field2')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="全部">全部</Select.Option>
                  <Select.Option value="IT/互联网">IT/互联网</Select.Option>
                  <Select.Option value="金融业">金融业</Select.Option>
                  <Select.Option value="银行业">银行业</Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="学历">
              {getFieldDecorator('degree')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Select.Option value="-1">全部</Select.Option>
                  {degree}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const {
      userInfo: { data },
      loading,
    } = this.props;
    const { selectedRows, path } = this.state;
    const headers = {
      '/data/list': '数据管理',
      '/report/list': '职业征信评估',
    };
    return (
      <PageHeaderWrapper title={headers[path]}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserInfoList;
