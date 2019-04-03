import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Spin, Card } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { Bar, Pie } from '@/components/Charts';
import styles from './Home.less';

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

const Gender = {
  '1': '男',
  '2': '女',
};

@connect(({ statistics, loading }) => ({
  statistics,
  loading: loading.effects['statistics/fetch'],
}))
class Home extends Component {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'statistics/fetch',
    });
  }


  render() {
    const { statistics, loading } = this.props;
    const {
      eduDistribution = {},
      fieldDistribution = {},
      genderDistribution = {},
      professionDistribution = {},
    } = statistics;

    const rawFieldDistribution = [];
    let total = 0;
    for (const key in fieldDistribution) {
      rawFieldDistribution.push({ x: key, y: fieldDistribution[key] });
      total += fieldDistribution[key];
    }
    const rawProfessionDistribution = [];
    for (const key in professionDistribution) {
      rawProfessionDistribution.push({ x: key, y: professionDistribution[key] });
    }
    const rawGenderDistribution = [];
    for (const key in genderDistribution) {
      rawGenderDistribution.push({
        x: `${Gender[`${key}`]}`,
        y: genderDistribution[key],
      });
    }
    const rawEduDistribution = [];
    for (const key in eduDistribution) {
      rawEduDistribution.push({
        x: `${Degree[`${key}`]}`,
        y: eduDistribution[key],
      });
    }

    return (
      <GridContent>
        <Suspense fallback={null}>
          <Spin spinning={loading}>
            <Row gutter={24}>
              <Col span={12}>
                <Card>
                  <Pie
                    hasLegend
                    title="用户行业分布"
                    subTitle="用户行业分布"
                    total={() => total}
                    data={rawFieldDistribution}
                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }}/>}
                    height={294}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Pie
                    hasLegend
                    title="用户性别分布"
                    subTitle="用户性别分布"
                    total={() => total}
                    data={rawGenderDistribution}
                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }}/>}
                    height={294}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Bar
                    height={294}
                    title="用户学历分布"
                    data={rawEduDistribution}
                    autoLabel
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Pie
                    hasLegend
                    title="用户职业分布"
                    subTitle="用户职业分布"
                    total={() => total}
                    data={rawProfessionDistribution}
                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }}/>}
                    height={294}
                  />
                </Card>
              </Col>
            </Row>
          </Spin>
        </Suspense>
      </GridContent>
    );
  }
}

export default Home;
