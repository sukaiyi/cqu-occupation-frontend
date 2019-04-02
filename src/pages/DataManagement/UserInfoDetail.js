import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Table, Divider, Tag } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfoDetail.less';

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
const { Description } = DescriptionList;

@connect(({ userInfo, loading }) => ({
  loading: loading.effects['userInfo/fetchDetail'],
  userInfo,
}))
class UserInfoDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      payload: params.id,
      type: 'userInfo/fetchDetail',
    });
  }

  render() {
    const { userInfo = {}, loading } = this.props;
    const { detail = {} } = userInfo;
    const { impTagList = [], proTagList = [], eduExp = [], workExp = [] } = detail;
    const eduExpColumns = [
      {
        dataIndex: 'degree',
        title: '学历',
        render: (value) => {
          return Degree[value] || '未知';
        },
      },
      {
        dataIndex: 'school',
        title: '学校',
      },
      {
        dataIndex: 'start',
        title: '就读时间',
        render: (vaule, rowData) => `${rowData.startDate} - ${rowData.endDate}`,
      },
      {
        dataIndex: 'department',
        title: '专业',
      },
    ];
    const workExpColumns = [
      {
        dataIndex: 'cmpName',
        title: '公司',
      },
      {
        dataIndex: 'position',
        title: '职位',
      },
      {
        dataIndex: 'startDate',
        title: '就职时间',
        render: (value, rowData) => `${rowData.startDate} - ${rowData.endDate}`,
      },
    ];
    return (
      <PageHeaderWrapper title="详情页" loading={loading}>
        <Card style={{ marginBottom: 32 }}>
          <Row>
            <Col span={18}>
              <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
                <Description term="姓名">{detail.name}</Description>
                <Description term="真实姓名">{detail.realname}</Description>
                <Description term="家乡">{detail.city}</Description>
                <Description term="性别">{detail.gender === '1' ? '男' : '女'}</Description>
                <Description term="生日">{detail.birthday}</Description>
                <Description term="星座">{detail.xingzuo}</Description>
                <Description term="领域">{detail.field}</Description>
                <Description term="职业">{detail.profession}</Description>
                <Description term="省份">{detail.province}</Description>
                <Description term="城市">{detail.city}</Description>
                <Description term="职位">{detail.position}</Description>
                <Description term="在职公司">{detail.company}</Description>
                <Description term="最高学历">{detail.company}</Description>
                <Description term="公司地址">{detail.cmpAddress}</Description>
                <Description term="一句话介绍自己">{detail.oneSentence}</Description>
                <Description term="主页展示的介绍语言">{detail.headline}</Description>
              </DescriptionList>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 160 }}
                cover={<img alt="example" src={detail.avatar} />}
              >
                <Card.Meta
                  title={detail.name}
                  description={detail.position}
                />
              </Card>
            </Col>
          </Row>

          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>印象标签</div>
          <div className={styles.tags}>
            {impTagList.map(tag => {
              return <Tag>{tag}</Tag>;
            })}
          </div>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>职业标签</div>
          <div className={styles.tags}>
            {proTagList.map(tag => {
              return <Tag>{tag}</Tag>;
            })}
          </div>
          <Divider style={{ marginBottom: 32 }}/>
          <div className={styles.title}>教育经历</div>
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={eduExp}
            columns={eduExpColumns}
            rowKey="no"
          />
          <div className={styles.title}>工作经历</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={workExp}
            columns={workExpColumns}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserInfoDetail;
