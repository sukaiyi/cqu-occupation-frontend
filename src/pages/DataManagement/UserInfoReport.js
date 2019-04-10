import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Table, Divider, Tag, Progress, Popover, Icon } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './UserInfoReport.less';
import { Bar, Radar, Pie, ChartCard } from '@/components/Charts';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1134721_n33ksc5de2p.js',
});

const Degree = {
  '0': '专科',
  '1': '本科',
  '2': '硕士',
  '3': '博士',
  '4': '博士后',
  '5': '其他',
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
class UserInfoReport extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { params } = match;

    dispatch({
      payload: params.id,
      type: 'userInfo/fetchDetailStatistics',
    });
  }

  render() {
    const { userInfo = {}, loading } = this.props;
    const { detail = {}, statistics = {} } = userInfo;
    const { impTagList = [], proTagList = [], eduExp = [], workExp = [] } = detail;
    const { eduDistribution = {}, thisDegree, professionDistribution = {} } = statistics;
    const eduDistributionChartData = [];
    const eduDistributionColor = {};
    for (const key in eduDistribution) {
      eduDistributionChartData.push({
        x: `${Degree[`${key}`]}`,
        y: eduDistribution[key],
      });

      eduDistributionColor[`${Degree[`${key}`]}`] = `${thisDegree}` === `${key}` ? '#00ffff' : '#00ff00';
    }

    let total = 0;
    const professionDistributionChartData = [];
    for (const key in professionDistribution) {
      professionDistributionChartData.push({ x: key, y: professionDistribution[key] });
      total += professionDistribution[key];
    }

    const radarChartData = [
      { label: '互动数', value: detail.interactions === 0 ? 0 : Math.log10(detail.interactions) },
      { label: '动态数', value: detail.dongtai === 0 ? 0 : Math.log10(detail.dongtai) },
      { label: '观点数', value: detail.guandian === 0 ? 0 : Math.log10(detail.guandian) },
      { label: '专栏数', value: detail.zhuanlan === 0 ? 0 : Math.log10(detail.zhuanlan) },
      { label: '点评数', value: detail.dianping === 0 ? 0 : Math.log10(detail.dianping) },
      { label: '被点赞次数', value: detail.likes === 0 ? 0 : Math.log10(detail.likes) },
      { label: '被访问次数', value: detail.views === 0 ? 0 : Math.log10(detail.views) },
      { label: '最后收到的Feed数', value: detail.recentFeeds === 0 ? 0 : Math.log10(detail.recentFeeds) },
    ];
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
                <Description term="家乡">{detail.htProvince}</Description>
                <Description term="性别">{detail.gender === '1' ? '男' : '女'}</Description>
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
                <Description term="互动数">{detail.interactions}</Description>
                <Description term="动态数">{detail.dongtai}</Description>
                <Description term="观点数">{detail.guandian}</Description>
                <Description term="专栏数">{detail.zhuanlan}</Description>
                <Description term="点评数">{detail.dianping}</Description>
                <Description term="被点赞次数">{detail.likes}</Description>
                <Description term="被访问次数">{detail.views}</Description>
                <Description term="最后收到的Feed数">{detail.recentFeeds}</Description>
                <Description term="影响力">{detail.influence}</Description>
                <Description term="影响力超过">{detail.infDefeat}</Description>
                <Description term="资料完善度">{detail.infoRatio}</Description>
                <Description term="更新时间">{detail.uptime}</Description>
              </DescriptionList>

            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: 200 }}
                cover={<img alt="example" src={detail.avatar}/>}
              >
                <Card.Meta
                  title={detail.name}
                  description={detail.position}
                />
              </Card>
              <div style={{ width: 200, paddingTop: '20px' }}>
                <h4>资料完善度</h4>
                <Progress
                  percent={detail.infoRatio}
                  status="active"
                />
              </div>
              <div style={{ width: 200, paddingTop: '20px' }}>
                <h4>
                  影响力：
                  <Popover
                    style={{ width: '100px' }}
                    title="影响力范围"
                    content={
                      <div>
                        <div><IconFont type="icondegree-1"/> : 0- 500</div>
                        <div><IconFont type="icondegree-2"/> : 501-1000</div>
                        <div><IconFont type="icondegree-3"/> : 1001-1500</div>
                        <div><IconFont type="icondegree-4"/> : 1501-2000</div>
                        <div><IconFont type="icondegree-5"/> : 2000 以上</div>
                      </div>
                    }
                    trigger="hover"
                  >
                    <IconFont type={`icondegree-${Math.min(parseInt((detail.influence - 1) / 500, 10) + 1, 5)}`}/>
                  </Popover>，
                  超过{detail.infDefeat}%的人
                </h4>
              </div>
            </Col>
          </Row>
          <Divider style={{ marginBottom: 32 }}/>

          <div className={styles.title}>社交关系</div>
          <Radar
            height={280}
            data={radarChartData}
          />
          <Divider style={{ marginBottom: 32 }}/>

          <div className={styles.title}>印象标签</div>
          <div className={styles.tags}>
            {impTagList.map(tag => {
              return <Tag>{tag}</Tag>;
            })}
          </div>
          <Divider style={{ marginBottom: 32 }}/>

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

          <div className={styles.title}>统计表</div>
          <Row gutter={24}>
            <Col span={12}>
              <ChartCard title="离职风险预警" contentHeight={200}>
                <iframe
                  title="离职风险预警图"
                  src={detail.dimissionRisk}
                  frameBorder={0}
                  width="100%"
                  height="200"
                  scrolling="no"
                />
              </ChartCard>
            </Col>
            <Col span={12}>
              <ChartCard title="学历分布图" contentHeight={200}>
                <Bar
                  hasLegend
                  data={eduDistributionChartData}
                  barColor={eduDistributionColor}
                  autoLabel
                />
              </ChartCard>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <ChartCard title="职业分布" contentHeight={300}>
                <Pie
                  hasLegend
                  title="用户职业分布"
                  subTitle="用户职业分布"
                  total={() => total}
                  data={professionDistributionChartData}
                  valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }}/>}
                />
              </ChartCard>
            </Col>
          </Row>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default UserInfoReport;
